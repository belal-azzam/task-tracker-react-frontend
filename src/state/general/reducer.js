import {REMOVE_MESSAGE, SET_MESSAGE} from "./types";
const initialState = {
    "message": {message: "error", type: "error"}
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case SET_MESSAGE:
            return {
                ...state,
                message: {...state.message, message: action.payload.message, type: action.payload.type}
            }
            break;
        case REMOVE_MESSAGE:
            return {
                ...state,
                message: {},
            }
            break;
        default:
            return state;
    }
}
