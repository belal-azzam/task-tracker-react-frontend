import {
    ADD_TASK_DATA,
    GET_TASKS,
    HIDE_TASK_MODAL,
    MOVE_TASK,
    SET_TASKS_DATA,
    SHOW_TASK_MODAL,
    UPDATE_TASK_DATA
} from "./types";
const initialState = {
    "tasks": {
    },
    "statuses": {
    },
    "types": {

    },
    "status_order": [],
    "task_modal": {
        isShown: false,
        taskId: null
    }
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case SET_TASKS_DATA:
            let statuses = {};
            let tasks = {};
            let statusOrder = [];
            let types = {};
            action.payload.task_types.forEach(taskType  => {
                types[taskType.id] = taskType;
            });
            action.payload.task_statuses.forEach(taskStatus => {
                taskStatus.tasks = taskStatus.tasks.map(task => {
                    tasks[task.id] = task;
                    return task.id;

                })
                statuses[taskStatus.id] = taskStatus;
                statusOrder.push(taskStatus.id);
            });

            return {
                ...state,
                tasks: {...tasks},
                statuses: {...statuses},
                status_order: statusOrder,
                types: types,
            };
            break;
        case MOVE_TASK:
            const newState = moveTask(state, action.payload);
            if(newState)
            {
                return newState;
            }
            return state;
        break;
        case SHOW_TASK_MODAL:
            let taskId = action.payload;
            if(!taskId)
            {
                taskId = null;
            }
            return {
                ...state,
                task_modal: {
                    isShown: true,
                    taskId: taskId
                }
            };
            break;
        case HIDE_TASK_MODAL:
            return {
                ...state,
                task_modal: {
                    isShown: false,
                }
            }
            break;
        case UPDATE_TASK_DATA:
             const updatedTaskId = action.payload.taskId;
             let taskData = action.payload.taskData;
             var oldTaskStatus = state.tasks[updatedTaskId].status_id;
             if(oldTaskStatus !== taskData.status_id)
             {
                 const oldTaskIndex = state.statuses[oldTaskStatus].tasks.indexOf(updatedTaskId);
                 let oldStatusTasks = state.statuses[oldTaskStatus].tasks.slice();
                 oldStatusTasks.splice(oldTaskIndex, 1);
                 let newStatusTasks = state.statuses[taskData.status_id].tasks.slice();;
                 newStatusTasks.splice(0,0,updatedTaskId);
                 return {
                     ...state,
                     statuses: {
                         ...state.statuses,
                        [taskData.status_id]: {
                            ...state.statuses[taskData.status_id],
                            tasks: newStatusTasks,
                        },
                        [oldTaskStatus]: {
                            ...state.statuses[oldTaskStatus],
                            tasks: oldStatusTasks,
                        }
                     },
                     tasks: {
                         ...state.tasks,
                         [updatedTaskId]: {...taskData}
                     }
                 }
             }

             return {
                 ...state,
                 tasks: {
                     ...state.tasks,
                     [updatedTaskId]: {...taskData}
                 }
             };
            break;
        case ADD_TASK_DATA:
            let statusNewTasks = state.statuses[action.payload.status_id].tasks.slice();
            statusNewTasks.splice(0,0, action.payload.id);
            return {
                ...state,
                statuses: {
                    ...state.statuses,
                    [action.payload.status_id]: {
                        ...state.statuses[action.payload.status_id],
                        tasks: statusNewTasks
                    }
                },
                tasks:{
                    ...state.tasks,
                    [action.payload.id]: action.payload
                }
            };
            break;
        default:
            return state;
    }
}

function moveTask(state, result)
{

    const {destination, source, draggableId} = result;
    if(!destination)
    {
        return;
    }

    if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    )
        return;

    const start = state.statuses[source.droppableId];
    const finish = state.statuses[destination.droppableId];

    if(start === finish)
    {
        const newTaskIds = Array.from(start.tasks);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newStatus = {
            ...start,
            tasks: newTaskIds
        };

        const newState = {
            ...state,
            statuses:{
                ...state.statuses,
                [newStatus.id]: newStatus
            }
        };
        return newState;
    }

    //moving between columns
    const startTaskIds = Array.from(start.tasks);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        tasks: startTaskIds
    }

    const finishTaskIds = Array.from(finish.tasks);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        tasks: finishTaskIds
    };

    const newState = {
        ...state,
        statuses: {
            ...state.statuses,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        }
    }
    return newState;
}