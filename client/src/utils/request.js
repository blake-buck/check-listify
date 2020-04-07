function get(url, useJwt){
    let headers = {}
    if(useJwt){
        headers.jwt = localStorage.getItem('jwt');
    }
    return fetch(url, {method:'GET', headers}).then(res => res.json());
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
    ).then(response => response.json());
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
    ).then(response => response.json())
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
    ).then(response => response.json())
}

module.exports = {
    get,
    post,
    put,
    delete: del
}