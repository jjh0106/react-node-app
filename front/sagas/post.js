import axios from 'axios';
import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import { 
    ADD_POST_REQUEST,
    ADD_POST_FAILURE,
    ADD_POST_SUCCESS,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_SUCCESS,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
 } from '../reducers/post';

function addPostAPI(data){
    return axios.post('/post', data, {
        withCredentials: true,
    });
}

// data -> action.data.content & action.data.postId
function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
        withCredentials: true,
    });
}

function loadCommentsAPI(postId){
    return axios.get(`/post/${postId}/comments`);
}

function loadMainPostsAPI(){
    return axios.get('/posts');
}

function loadUserPostsAPI(id){
    return axios.get(`/user/${id}/posts`);
}

function loadHashtagPostsAPI(tag){
    return axios.get(`/hashtag/${tag}`);
}

function* addPost(action){
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* addComment(action){ 
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data
            },
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* loadComments(action){
    try {
        const result = yield call(loadCommentsAPI, action.data);
        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data,
            }
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e,
        })
    }
}

function* loadMainPosts(){
    try {
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}

function* loadUserPosts(action){
    try {
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: e,
        });
    }
}

function* loadHashtagPosts(action){
    try {
        const result = yield call(loadHashtagPostsAPI, action.data);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadMainPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
    ]);
}