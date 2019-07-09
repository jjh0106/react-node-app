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
 } from '../reducers/user';

//////////////////////////// API 호출::Begin ////////////////////////////
function loginAPI(data){
    return axios.post('/user/login/', data, {
        withCredentials: true,
    });
}

function logoutAPI(){
    return axios.post('/user/logout/', {}, {
        withCredentials: true,
    });
}

function signupAPI(data){
    return axios.post('/user/', data);
}

function loadUserAPI(userId){
    return axios.get( userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}
//////////////////////////// API 호출::End ////////////////////////////




//////////////////////////// Dispatch::Begin ////////////////////////////
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
//////////////////////////// Dispatch::End //////////////////////////// 




//////////////////////////// Watch::Begin ////////////////////////////
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup)
}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST, loadUser)
}
//////////////////////////// Watch::End ////////////////////////////




//////////////////////////// Entry ////////////////////////////
export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchLoadUser),
    ]);
}

// take: 해당 액션이 디스패치되면 제너레이터를 next하는 이펙트(해당 액션을 기다리다가 yield를 풀어준다.)
// 서버에 동시에 두 요청 이상이 발생했을 때, 모두 허용할 것인가(takeEvery) 아니면 마지막 것만 허용할 것인가 차이(takeLatest)  
// call은 동기호출, fork는 비동기호출 -- API를 요청 후 응답을 받고 다음 행동을  취하기 위해서는 call로 응답을 대기한다.