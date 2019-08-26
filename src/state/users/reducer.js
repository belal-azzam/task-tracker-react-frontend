import {
    LOGOUT,
    REMOVE_MESSAGE,
    SET_AUTH_USER_DATA,
    SET_LOGIN_ERROR,
    SET_MESSAGE,
    SET_REGISTER_ERRORS,
    SET_USERS
} from "./types";
import jwt_decode from 'jwt-decode';
const initialState = {
    "users": {},
    'authUser': {
        id: '',
        username: '',
        email: '',
        photo: ''
    },
    registerErrors: {

    },
    loginError: '',
    isAuthenticated: false
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case SET_USERS:
            return {
                ...state,
                users: {...action.payload}
            };
            break;
        case SET_AUTH_USER_DATA:
            localStorage.setItem('authToken', action.payload.token);
            return {
                ...state,
                authUser: jwt_decode(action.payload.token),
                isAuthenticated: true
            }
            break;
        case LOGOUT:
            localStorage.removeItem('authToken');
            return {
                ...state,
                authUser: {} ,
                isAuthenticated: false,
            };
        case SET_REGISTER_ERRORS:
            return{
                ...state,
                registerErrors: action.payload
            };
            break;
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload
            };
            break;
        default:
            return state;
    }
}
