import {REMOVE_MESSAGE, SET_MESSAGE, SET_USERS} from "./types";
const initialState = {
    "users": {},
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case SET_USERS:
            return {
                ...state,
                users: {...action.payload}
            }
            break;

        default:
            return state;
    }
}
