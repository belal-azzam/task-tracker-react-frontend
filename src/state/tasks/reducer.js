import {GET_TASKS, MOVE_TASK} from "./types";
const initialState = {
    "tasks": {
        "task-1": {"id": "task-1", "content": "test 1"},
        "task-2": {"id": "task-2", "content": "test  2"},
        "task-3": {"id": "task-3", "content": "test  3"},
        "task-4": {"id": "task-4", "content": "test  4"},
        "task-5": {"id": "task-5", "content": "test  4"},
        "task-6": {"id": "task-6", "content": "test  4"},
        "task-7": {"id": "task-7", "content": "test  4"},
        "task-8": {"id": "task-8", "content": "test  4"},
    },

    "columns": {
        "column-1": {
            "id": "column-1",
            "title": "TO DO",
            "taskIds": ["task-1","task-2","task-3", "task-4", "task-5", "task-6", "task-7", "task-8"]
        },
        "column-2": {
            "id": "column-2",
            "title": "in progress",
            "taskIds": []
        },
        "column-3": {
            "id": "column-3",
            "title": "Done",
            "taskIds": []
        }
    },
    "columnOrder": ["column-1", "column-2", "column-3"]
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case GET_TASKS:
            return {
                ...state
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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if(start === finish)
    {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds
        };

        const newState = {
            ...state,
            columns:{
                ...state.columns,
                [newColumn.id]: newColumn
            }
        };
        return newState;
    }

    //moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        taskIds: finishTaskIds
    };

    const newState = {
        ...state,
        columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        }
    }
    return newState;
}