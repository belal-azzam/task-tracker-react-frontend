import axios from 'axios';
import {
    ADD_TASK_DATA,
    GET_TASKS,
    HIDE_TASK_MODAL,
    MOVE_TASK,
    SET_TASKS_DATA,
    SHOW_TASK_MODAL,
    UPDATE_TASK_DATA
} from "./types";
import {setMessage} from "../general/actions";
import {API_URL} from "../../config/constants";
export const getTasks = () => dispatch => {
    axios.get('http://localhost:4000/api/tasks')
        .then(res => {
            dispatch(setTasksData(res.data.data))
        }).catch(err => {
            dispatch(setTasksData({}))
    })
}

export const setTasksData = (tasksData) => {
    return {
        payload: tasksData,
        type: SET_TASKS_DATA
    };
}

export const moveTask = (payload) => {
    return {
        type: MOVE_TASK,
        payload: payload
    }
}

export const showTaskModal = (taskId) => {
    return {
        type: SHOW_TASK_MODAL,
        payload: taskId,
    }
}

export const hideTaskModal = () => {
    return {
        type: HIDE_TASK_MODAL,
    }
}

export const updateTaskStatus = (dropEventData) => dispatch => {

    if(dropEventData.destination != null)
    {
        if(
            dropEventData.destination.droppableId === dropEventData.source.droppableId &&
            dropEventData.destination.index === dropEventData.source.index
        )
            return;
        const taskId = dropEventData.draggableId;
        const statusId = dropEventData.destination.droppableId;
        axios.put('http://localhost:4000/api/tasks/update_status/'+ taskId, {status_id: statusId})
            .then(res => {
                dispatch(moveTask(dropEventData));
                dispatch(setMessage({message: res.data.message, type:'success'}));
            }).catch((err, res) => {
            dispatch(setMessage({message: err.response.data.message, type:'error'}));
        })
    }
    return ;
}

export const updateTaskData = (payload  = {taskId: 0, taskData: {}}) => {
    return {
        type: UPDATE_TASK_DATA,
        payload: payload
    }
}

export const addTaskData = (taskData) => {
    return {
        type: ADD_TASK_DATA,
        payload: taskData
    }
}

export const updateTask = (taskId, taskData) => (dispatch) => {
    axios.put(API_URL + 'tasks/'+taskId, taskData).then((res) => {
        dispatch(updateTaskData({taskId, taskData}))
        dispatch(setMessage({message: 'Task saved successfully!', 'type' : 'success'}))

    }).catch((err) => {
        console.log(err);
        dispatch(setMessage({message: 'Task update failed!', 'type' : 'error'}))
    })
}

export const addTask = (taskData) => (dispatch) => {
    axios.post(API_URL + 'tasks/', taskData).then((res) => {
        dispatch(addTaskData(res.data))
        dispatch(setMessage({message: 'Task saved successfully!', 'type' : 'success'}))
    }).catch((err) => {
        dispatch(setMessage({message: 'Task save failed!', 'type' : 'error'}))
    })
}
