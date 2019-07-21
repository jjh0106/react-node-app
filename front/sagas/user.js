import axios from 'axios';
import { takeLatest, takeEvery, all, fork, call, put, take, delay, race, cancel, throttle, select } from 'redux-saga/effects';
import { 
    LOG_IN_REQUEST, 
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
 } from '../reducers/user';

 //////////////////////////////////////////// login ////////////////////////////////////////////
function loginAPI(data){
    return axios.post('/user/login/', data, {
        withCredentials: true,
    });
}

function* login(action){
    try {
        const result = yield call(loginAPI, action.data);
        yield put({ // put은 dispatch와 동일.
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

//////////////////////////////////////////// logout ////////////////////////////////////////////
function logoutAPI(){
    return axios.post('/user/logout/', {}, {
        withCredentials: true,
    });
}

function* logout(){
    try {
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: LOG_OUT_FAILURE,
        });
    }
}

function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

//////////////////////////////////////////// signup ////////////////////////////////////////////
function signupAPI(data){
    return axios.post('/user/', data);
}

function* signup(action){ 
    try {
        yield call(signupAPI, action.data); // action.data에는 컴포넌트에서 디스패치한 userId, password, nickname가 들어있다.
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup)
}

//////////////////////////////////////////// load user ////////////////////////////////////////////
function loadUserAPI(userId){
    return axios.get( userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}

function* loadUser(action){ 
    try {
        const result = yield call(loadUserAPI, action.data); 
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

//////////////////////////////////////////// follow ////////////////////////////////////////////
function followAPI(userId){
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action){
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchFollow(){
    yield takeLatest(FOLLOW_USER_REQUEST, follow)
}

//////////////////////////////////////////// follow ////////////////////////////////////////////
function unfollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}

function* unfollow(action){
    try {
        const result = yield call(unfollowAPI, action.data);
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch(e) {
        console.log(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnfollow),
    ]);
}

// take: 해당 액션이 디스패치되면 제너레이터를 next하는 이펙트(해당 액션을 기다리다가 yield를 풀어준다.)
// 서버에 동시에 두 요청 이상이 발생했을 때, 모두 허용할 것인가(takeEvery) 아니면 마지막 것만 허용할 것인가 차이(takeLatest)  
// call은 동기호출, fork는 비동기호출 -- API를 요청 후 응답을 받고 다음 행동을  취하기 위해서는 call로 응답을 대기한다.