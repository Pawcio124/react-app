import {request} from "../agent";
import {
    PROJECT_DELETED, PROJECT_DELETED_REQUEST,
    PROJECT_ERROR,
    PROJECT_LIST_ERROR,
    PROJECT_LIST_RECEIVED,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SET_PAGE,
    PROJECT_RECEIVED,
    PROJECT_REQUEST,
    PROJECT_UNLOAD,
    TASK_ADDED, TASK_DELETED, TASK_DELETED_REQUEST,
    TASK_LIST_ERROR,
    TASK_LIST_RECEIVED,
    TASK_LIST_REQUEST,
    TASK_LIST_UNLOAD, TASK_UPDATED, USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST, USER_REGISTER_COMPLETE,
    USER_REGISTER_SUCCESS,
    USER_SET_ID
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";


export const projectListRequest=()=>({
    type: PROJECT_LIST_REQUEST,
});

export const projectListError=(error)=>({
    type: PROJECT_LIST_ERROR,
    error
});

export const projectListReceived=(data)=>({
    type: PROJECT_LIST_RECEIVED,
    data
});

export const projectListSetPage=(page)=>({
    type: PROJECT_LIST_SET_PAGE,
    page
});

export const projectListFetch = (page = 1) => {
    return (dispatch) =>{
        dispatch(projectListRequest());
        return request.get(`/projects?_page=${page}`, true)
            .then(response => dispatch(projectListReceived(response)))
            .catch(error => dispatch(projectListError(error)));
    }
};

export const projectRequest = () => ({
    type: PROJECT_REQUEST,
});

export const projectError=(error)=>({
    type: PROJECT_ERROR,
    error
});
export const projectReceived=(data)=>({
    type: PROJECT_RECEIVED,
    data
});

export const projectUnload = () => ({
    type: PROJECT_UNLOAD,
});

export const projectFetch= (id) => {
    return (dispatch) => {
        dispatch(projectRequest());
        return request.get(`/projects/${id}`, true)
            .then(response => dispatch(projectReceived(response)))
            .catch(error => dispatch(projectError(error)));
    }
};

export const projectAdd = (title, content, dateEnd, priority) => {
    return (dispatch) => {
        return request.post(
            '/projects',
            {
                title,
                content,
                dateEnd,
                priority: parseInt(priority, 10),
                slug: title && title.replace(/ /g,"-").toLowerCase()
            }
        ).catch((error) =>{
            if (401 === error.response.status) {
                return dispatch(userLogout());
            } else if (403 === error.response.status){
                throw new SubmissionError({
                    _error: 'Nie masz uprawnień do dodania projektu!'
                });
            }
            throw new SubmissionError(parseApiErrors(error));
        })
    }
};

export const projectEdit = (title, content, dateEnd, projectId,priority ) =>{
    return (dispatch)=>{
        return request.put(
            `/projects/${projectId}`,
            {
                title,
                content,
                dateEnd,
                priority: parseInt(priority, 10)
            }
        )
    }
};

export const projectDeleted= (id) =>{
  return {
      type: PROJECT_DELETED,
      projectId : id
  }
};

export const projectDeletedRequest =()=>{
  return{
      type: PROJECT_DELETED_REQUEST
  }
};

export const projectDelete = (projectId) => {
    return (dispatch) => {
        dispatch(projectDeletedRequest());
        return request.delete(`/projects/${projectId}`, true)
            .then(() => dispatch(projectDeleted(projectId)));
    }
};

export const taskListRequest = () => ({
    type: TASK_LIST_REQUEST,
});
export const taskListError=(error)=>({
    type: TASK_LIST_ERROR,
    error
});
export const taskListReceived=(data)=>({
    type: TASK_LIST_RECEIVED,
    data
});
export const taskListUnload = () => ({
    type: TASK_LIST_UNLOAD,
});

export const taskListFetch= (id, page=1) => {
    return (dispatch) => {
        dispatch(taskListRequest());
        return request.get(`/projects/${id}/tasks?_page=${page}`, true)
            .then(response => dispatch(taskListReceived(response)))
            .catch(error => dispatch(taskListError(error)));
    }
};

export const taskAdded=(task)=>({
    type: TASK_ADDED,
    task
});

export const taskAdd = (task, projectId, place, dateEndTask, taskPriority) => {
    return (dispatch) => {
        return request.post(
            '/tasks',
            {
                content: task,
                place,
                dateEndTask,
                taskPriority: parseInt(taskPriority, 10),
                project: `/api/projects/${projectId}`
            }
        ).then(response => dispatch(taskAdded(response))
        ).catch(error =>{
            if (401 === error.response.status) {
               return dispatch(userLogout());
            }
            throw new SubmissionError(parseApiErrors(error));
        })
    }
};

export const taskEditUpdated= (task) =>{
    return {
        type: TASK_UPDATED,
        task
    }
};

export const taskEdit = (taskId, content, place, dateEndTask, taskPriority) =>{
    return dispatch => {
        request.put(
            `/tasks/${taskId}`,
            {
                content,
                place,
                dateEndTask,
                taskPriority: parseInt(taskPriority, 10)
            }
        ).catch(error => {
            console.log(error)
        }).then(response =>{dispatch(taskEditUpdated(response));})
    }};

export const taskDone = (taskId, done)=>{
    return request.put(`/tasks/${taskId}`,
        {
            done
        }
        )
};

export const taskDeleteRequest =()=>{
  return{
      type: TASK_DELETED_REQUEST
  }
};

export const taskDeleted=(task)=>({
    type: TASK_DELETED,
    taskId: task
});

export const taskDelete = (taskId) => {
    return (dispatch) => {
        dispatch(taskDeleteRequest());
        return request.delete(`/tasks/${taskId}`, true)
            .then(() => dispatch(taskDeleted(taskId)))
    }
};

export const userLoginSuccess=(token, userId) =>{
    return{
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return request.post('/login_check', {username, password}, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(() => {
            throw new SubmissionError({
                _error: "Nazwa użytkownika lub hasło jest błędne."
            })
        })
    }
};

export const userLogout = () =>{
    return{
        type: USER_LOGOUT
    }
};

export const userRegisterSuccess = () =>{
    return{
        type: USER_REGISTER_SUCCESS
    }
};

export const userRegister = (username, password, retypedPassword, email) => {
    return (dispatch) => {
        return request.post('/users', {username, password, retypedPassword, email}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error));
            });
    }
};

export const userConfirmationSuccess = () =>{
    return{
        type: USER_CONFIRMATION_SUCCESS
    }
};

export const userRegisterComplete = () =>{
    return{
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return request.post('/users/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Kod potwierdzający jest nieprawidłowy'
            });
            });
    }
};

export const userSetId=(userId) =>{
    return{
        type: USER_SET_ID,
        userId
    }
};

export const userProfileRequest=() =>{
    return{
        type: USER_PROFILE_REQUEST
    }
};

export const userProfileError=(userId) =>{
    return{
        type: USER_PROFILE_ERROR,
        userId
    }
};

export const userProfileReceived=(userId, userData) =>{
    return{
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userProfileFetch = (userId) =>{
    return (dispatch) =>{
        dispatch(userProfileRequest());
        return request.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))
        ).catch(() => dispatch(userProfileError(userId)))
    }
};