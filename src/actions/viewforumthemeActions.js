import {request} from "../request";
export const fetchForumTopic = (id) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        dispatch(requestTopic());
        const baseUrl = 'http://165.22.76.147:8080/voluntariapp/forum/';
        const finalPath = baseUrl + id;
        fetch(finalPath, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            dataType: 'json',
        }).then((resp) =>
            resp.json().then((body) =>
                dispatch(receiveTopic(body)))
            );
    }
}

const requestTopic = () =>{
    return{
        type: 'REQUEST_TOPIC'
    }
}

const receiveTopic =(topic)=>{
    return {
        type: 'RECEIVE_TOPIC',
        data: topic
    }
}

export const fetchForumTopicComments = (id) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        dispatch(requestTopic());
        const baseUrl = 'http://165.22.76.147:8080/voluntariapp/comment/forum/';
        const finalPath = baseUrl + id;
        fetch(finalPath, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            dataType: 'json',
        }).then((resp) =>
            resp.json().then((body) =>
                dispatch(receiveTopicComments(body)))
            );
    }
}

export const closeForumTopic = (id, forumTopicInfo) => {
    return () => {
        request('/forum/'+id, 'PATCH', forumTopicInfo);
    }
}

const receiveTopicComments =(comments)=>{
    return {
        type: 'RECEIVE_TOPIC_COMMENTS',
        data: comments
    }
}

export const changeNewComment =(text) => {
    return{
        type: 'CHANGE_NEW_COMMENT',
        data: text
    }
};

export const publishNewComment =(commentInfo) =>{
    return () => {
        request('/comment', 'POST', commentInfo);
    } 
}

export const deleteComment = (id, idTopic) =>{
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const baseUrl = 'http://165.22.76.147:8080/voluntariapp/comment/';
        const finalPath = baseUrl + id;
        fetch(finalPath, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            dataType: 'json',
        }).then((resp) =>{
            if(resp.ok){
                dispatch(fetchForumTopicComments(idTopic))
            }
        })    
    }
}