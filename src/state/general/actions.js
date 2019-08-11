import axios from 'axios';
import {REMOVE_MESSAGE, SET_MESSAGE} from "./types";


export const setMessage = (paylaod = {type: "", message : ""}) => {
    return {
        type: SET_MESSAGE,
        payload: paylaod
    }
}

export const removeMessage = () => {
    return {
        type: REMOVE_MESSAGE
    }
}