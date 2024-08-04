import { userUtil } from "./userUtil.js";

async function requester(method, url, data) {
    const option = {method, headers: {}}

    const userToken = userUtil.getToken();
    if(userToken){
        option.headers["X-Authorization"] = userToken;
    }

    if(data){
        option.headers["content-type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);
        
        if(!response.ok){
            const error = response.json();
            throw new Error(error.message);
        }

        if(response.status === 204){
            return response;
        }

        return await response.json();
    } catch (error) {
        alert(error);
        throw new Error(error);
    }
}

async function get(url) {
    return requester("get", url);
}

async function post(url, data) {
    return requester("post", url, data);
}

async function put(url, data) {
    return requester("put", url, data);
}

async function del(url) {
    return requester("delete", url);
}

export const api = { get, post, put, del }