import {
    TASK_LIST_REQUEST,
    TASK_LIST_RECEIVED,
    TASK_LIST_ERROR,
    TASK_LIST_UNLOAD,
    TASK_ADDED, TASK_DELETED, TASK_DELETED_REQUEST
} from "../actions/constants";
import {hydraPageCount} from "../apiUtils";

export default ( state ={
    taskList: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type){
        case TASK_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case TASK_LIST_RECEIVED:
            return {
                ...state,
                taskList: !state.taskList ? action.data['hydra:member']
                    : state.taskList.concat(action.data['hydra:member']),
                isFetching: false,
                currentPage: state.currentPage + 1,
                pageCount: hydraPageCount(action.data)
            };
        case TASK_ADDED:
            return {
                ...state,
                taskList: [action.task, ...state.taskList]
            };
        case TASK_DELETED_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case TASK_DELETED:
            return{
                ...state,
                taskList: state.taskList.filter(task => task.id !== action.taskId),
                isFetching: false
            };
        case TASK_LIST_ERROR:
        case TASK_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                taskList: null,
                currentPage: 1,
                pageCount: null
            };
        default:
            return state;
    }
}
