const dummyUser = {
    nickname: '재호정',
    Post: [],
    Followings: [],
    Followers: [],
    signupData: {},
};

export const initialState = {
    isLoggedIn: false,
    user: null,
};

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP';
export const LOG_IN = 'LOG_IN'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; 
export const LOG_OUT = 'LOG_OUT'; 

export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data,
    };
};

export const loginAction = {
    type: LOG_IN,
};

export const logoutAction = {
    type: LOG_OUT,
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signupData: action.data,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default reducer;
