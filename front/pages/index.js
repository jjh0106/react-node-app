import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onScroll = () => {
        // window.scrollY => 현재 위치 (화면에서 가장 윗 부분의 위치)
        // document.documentElement.clientHeight => 화면에서 가장 윗부분부터 가장 아랫부분까지의 길이
        // document.documentElement.scrollHeight => 페이지 전체의 스크롤 길이
        if( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 ){
            dispatch({
                type: LOAD_MAIN_POSTS_REQUEST,
                lastId: mainPosts[mainPosts.length - 1].id,
            })
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);

    return (
        <div>
            {me && <PostForm />}
            {mainPosts.map((c) => {
                return <PostCard key={c} post={c} />
            })}
        </div>
    );
};

Home.getInitialProps = async(context) => {
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    })
}

export default Home;