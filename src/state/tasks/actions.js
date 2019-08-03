import {GET_TASKS, MOVE_TASK} from "./types";
export const getTasks = () => {
    return {
        type: GET_TASKS
    }
}

export const moveTask = (payload) => {
    return {
        type: MOVE_TASK,
        payload: payload
    }
}