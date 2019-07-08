import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Card, Icon, Button, Avatar, List, Form, Input, Comment } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState(''); 
    const { me } = useSelector(state => state.user);
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if( !me ){
            return alert('댓글 입력을 위해서는 로그인을 해주세요.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            }
        })
    }, [me && me.id]);

    const onChangeCommentText = useCallback((e) => {
        const { value } = e.target;
        setCommentText(value);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
    }, []);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true])

    return (
        <div>
            <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img} />}
            actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" onClick={onToggleComment} />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
            extra={<Button>Follow</Button>}
            >
                <Card.Meta 
                    avatar={(
                        <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                            <a>
                                <Avatar>{post.User.nickname[0]}</Avatar>
                            </a>
                        </Link>
                    )}
                    title={post.User.nickname}
                    description={(
                        <div>
                            {post.content.split(/(#[^\s]+)/g).map((v) => {
                                if( v.match(/#[^\s]+/) ){
                                    return (
                                        <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} key={v} as={`/hashtag/${v.slice(1)}`}>
                                            <a>{v}</a>
                                        </Link>
                                    );
                                }
                                return v;
                            })}
                        </div>
                    )}
                />
            </Card>
            {commentFormOpened && (
            <>
                <Form onSubmit={onSubmitComment}>
                    <Form.Item>
                        <Input.TextArea row={4} value={commentText} onChange={onChangeCommentText} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                </Form>
                <List 
                    header={`${post.Comments ? post.Comments.length : 0}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments || []}
                    renderItem={item => (
                        <li>
                            <Comment 
                                author={item.User.nickname}
                                avatar={(
                                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                                        <a>
                                            <Avatar>{item.User.nickname[0]}</Avatar>
                                        </a>
                                    </Link>
                                )}
                                content={item.content}
                            />
                        </li>
                    )}
                />
            </>
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;