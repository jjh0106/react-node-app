import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePost } = useSelector(state => state.post);

    const onScroll = useCallback(() => {
        // window.scrollY => 현재 위치 (화면에서 가장 윗 부분의 위치)
        // document.documentElement.clientHeight => 화면에서 가장 윗부분부터 가장 아랫부분까지의 길이
        // document.documentElement.scrollHeight => 페이지 전체의 스크롤 길이
        if( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 ){
            if( hasMorePost ){
                dispatch({
                    type: LOAD_MAIN_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: tag,
                })
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);

    return (
        <div>
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async(context) => {
    const { tag } = context.query;
   context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
   });
   return {
       tag
   }
};

export default Hashtag;