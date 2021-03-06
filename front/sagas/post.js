import axios from 'axios';
import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
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
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_SUCCESS,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
 } from '../reducers/post';

 import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

//////////////////////////////////////////// add post ////////////////////////////////////////////
function addPostAPI(data){
    return axios.post('/post', data, {
        withCredentials: true,
    });
}

function* addPost(action){
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })
    } catch(e) {
        console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

//////////////////////////////////////////// add comment ////////////////////////////////////////////
// data -> action.data.content & action.data.postId
function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
        withCredentials: true,
    });
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

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}


//////////////////////////////////////////// load comment ////////////////////////////////////////////
function loadCommentsAPI(postId){
    return axios.get(`/post/${postId}/comments`);
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

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
}

//////////////////////////////////////////// load main posts ////////////////////////////////////////////
function loadMainPostsAPI(lastId=0, limit=10){
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`);
}

function* loadMainPosts(action){
    try {
        const result = yield call(loadMainPostsAPI, action.lastId);
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

function* watchLoadMainPosts(){
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts) // 쓰로틀 사용 시 첫 호출 후 설정한 초 내에 같은 리퀘스트가 호출될 수 없다.
}

//////////////////////////////////////////// load user posts ////////////////////////////////////////////
function loadUserPostsAPI(id){
    return axios.get(`/user/${id || 0}/posts`);
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

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

//////////////////////////////////////////// load hashtag posts ////////////////////////////////////////////
function loadHashtagPostsAPI(tag, lastId){
    return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`);
}

function* loadHashtagPosts(action){
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
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

function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

//////////////////////////////////////////// upload images ////////////////////////////////////////////
function uploadImagesAPI(formData){
    return axios.post('/post/images', formData, {
        withCredentials: true,
    });
}

function* uploadImages(action){
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        });
    }
}

function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

//////////////////////////////////////////// like post ////////////////////////////////////////////
function likePostAPI(postId){
    return axios.post(`/post/${postId}/like`, {}, {
        withCredentials: true,
    });
}

function* likePost(action){
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            },
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

//////////////////////////////////////////// unlike post ////////////////////////////////////////////
function unlikePostAPI(postId){
    return axios.delete(`/post/${postId}/like`, {
        withCredentials: true,
    });
}

function* unlikePost(action){
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            },
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

//////////////////////////////////////////// retweet ////////////////////////////////////////////
function retweetAPI(postId){
    return axios.post(`/post/${postId}/retweet`, {}, {
        withCredentials: true,
    });
}

function* retweet(action){
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: RETWEET_FAILURE,
            error: e,
        });
    }
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, retweet)
}

//////////////////////////////////////////// remove post ////////////////////////////////////////////
function removePostAPI(postId){
    return axios.delete(`/post/${postId}`, {
        withCredentials: true,
    });
}

function* removePost(action){
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadMainPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRetweet),
        fork(watchRemovePost),
    ]);
}