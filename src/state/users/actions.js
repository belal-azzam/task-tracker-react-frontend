import axios from 'axios';
import {SET_USERS} from "./types";
import {setMessage} from "../general/actions";


export const getUsers = () => dispatch => {
    axios.get('http://localhost:4000/api/users/')
        .then(res =>  {
            dispatch(setUsersData(res.data));
        }).catch(err => {
            dispatch(setMessage({message: 'Users retrieval failed', type: 'error'}));
    })
}

export const setUsersData = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}