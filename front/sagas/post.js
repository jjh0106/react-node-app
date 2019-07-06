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
 } from '../reducers/post';

function addPostAPI(data){
    return axios.post('/post', data, {
        withCredentials: true,
    });
}

function addCommentAPI(data){
    return axios.post('/post/comment', data, {
        withCredentials: true,
    });
}

function loadMainPostsAPI(){
    return axios.get('/posts');
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
        yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                comment: action.data.comment
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

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadMainPosts),
    ]);
}