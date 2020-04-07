function get(url, useJwt){
    let headers = {}
    if(useJwt){
        headers.jwt = localStorage.getItem('jwt');
    }
    return fetch(url, {method:'GET', headers});
}

function post(url, body, useJwt){
    let headers = {
        'Content-Type':'application/json'
    }
    if(useJwt){
        headers.jwt = localStorage.getItem('jwt');
    }
    return fetch(
        url, 
        {
            method:'POST',
            body:JSON.stringify(body),
            headers
        }
    ).then(response => response);
}

function put(url, body, useJwt){
    let headers = {
        'Content-Type':'application/json'
    }
    if(useJwt){
        headers.jwt = localStorage.getItem('jwt');
    }
    return fetch(
        url,
        {
            method:'PUT',
            body:JSON.stringify(body),
            headers
        }
    ).then(response => response)
}

function del(url, useJwt){
    let headers = {}
    if(useJwt){
        headers.jwt = localStorage.getItem('jwt');
    }
    return fetch(
        url,
        {
            method:'DELETE',
            headers
        }
    ).then(response => response)
}

module.exports = {
    get,
    post,
    put,
    delete: del
}