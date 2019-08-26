import axios from '../../config/axios';
import {LOGOUT, SET_AUTH_USER_DATA, SET_LOGIN_ERROR, SET_REGISTER_ERRORS, SET_USERS} from "./types";
import {setMessage} from "../general/actions";
import {API_URL} from "../../config/constants";


export const getUsers = () => dispatch => {
    axios.get('users/')
        .then(res =>  {
            dispatch(setUsersData(res.data));
        }).catch(err => {
            dispatch(setMessage({message: 'Users retrieval failed', type: 'error'}));
    })
}

export const login  = (email, password) => dispatch => {
    axios.post('users/login', {email, password}).then((res) => {
        dispatch(setAuthUserData(res.data));
    }).catch((err) => {
        dispatch(setLoginError('wrong email/password combination'));
    })
}

export const register = (payload = {username: '', email: '', password: ''}) => dispatch => {
    const data = new FormData();
    data.append('username', payload.username);
    data.append('email', payload.email);
    data.append('password', payload.password);
    data.append('photo', payload.photo);
    axios.post('users/register', data).then((res) => {
        dispatch(setAuthUserData(res.data));
    }).catch((err) => {
        if(err.response.status === 400)
        {
            let validationErrors = {};
            err.response.data.errors.forEach(validationError => {
                validationErrors[validationError.path] = validationError.message;
            });
            dispatch(setRegisterErrors(validationErrors));
        }else{
            dispatch(setMessage({meessage: 'user creating failed', 'type':  'error'}));
        }

    })
}

export const setRegisterErrors = (errors) => {
    return {
        type: SET_REGISTER_ERRORS,
        payload: errors,
    }
}

export const setLoginError = (error) => {
    return {
        type: SET_LOGIN_ERROR,
        payload: error,
    }
}

export const setAuthUserData  = (payload  = {user: {}, token: ''})  => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: payload
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const setUsersData = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}