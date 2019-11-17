import {
    PROJECT_ERROR,
    PROJECT_RECEIVED,
    PROJECT_REQUEST,
    PROJECT_UNLOAD
} from "../actions/constants";

export default(state ={
    project: null,
    isFetching: false,
}, action) =>{
    switch (action.type) {
        case PROJECT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case PROJECT_RECEIVED:
            return {
                ...state,
                project: action.data,
                isFetching: false
            };
        case PROJECT_ERROR:
            return{
              ...state,
              isFetching: false,
            };
        case PROJECT_UNLOAD:
            return {
                ...state,
                isFetching: false,
                project: null
            };
        default:
            return state;
    }
}