import {
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_ADD,
    PROJECT_LIST_RECEIVED,
    PROJECT_LIST_ERROR,
    PROJECT_LIST_SET_PAGE, PROJECT_DELETED_REQUEST, PROJECT_DELETED
} from "../actions/constants";
import {hydraPageCount} from "../apiUtils";

export default ( state ={
    projects: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type){
        case PROJECT_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;
        case PROJECT_LIST_RECEIVED:
            state = {
                ...state,
                projects: action.data['hydra:member'],
                pageCount: hydraPageCount(action.data),
                isFetching: false
            };
            return state;
        case PROJECT_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                projects: null
            };
        case PROJECT_LIST_ADD:
            state = {
                ...state,
                projects: state.projects ? state.projects.concat(action.data) : state.projects
            };
            return state;
        case PROJECT_DELETED_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case PROJECT_DELETED:
            return{
                ...state,
                project: state.projects.filter(project => project.id !== action.projectId),
                isFetching: false
            };
        case PROJECT_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        default:
            return state;
    }
}
