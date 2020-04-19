const {getBaseUrl} = require('./getBaseUrl');

async function get(url, useJwt){
    let headers = {}
    if(useJwt){
        headers.jwt = await getToken();
    }
    return fetch(url, {method:'GET', headers}).then(res => res.json());
}

async function post(url, body, useJwt){
    let headers = {
        'Content-Type':'application/json'
    }
    if(useJwt){
        headers.jwt = await getToken();
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

async function put(url, body, useJwt){
    let headers = {
        'Content-Type':'application/json'
    }
    if(useJwt){
        headers.jwt = await getToken();
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

async function del(url, useJwt){
    let headers = {}
    if(useJwt){
        headers.jwt = await getToken();
    }
    return fetch(
        url,
        {
            method:'DELETE',
            headers
        }
    ).then(response => response.json())
}


async function getToken(){
    const jwt = localStorage.getItem('jwt');

    // get the middle section of the JWT, decode it from Base64, then parse the result
    const jwtObj = JSON.parse(
        atob(localStorage.getItem('jwt').split('.')[1])
    );

    const body = JSON.stringify({
        refresh:localStorage.getItem('refresh')
    });


    // if token is expired, get a new access token
    if(Date.now() / 1000 > jwtObj.exp){
        const headers = {
            jwt
        };
    
        const response = await fetch(
            `${getBaseUrl()}/api/refresh-token`,
            {
                method:'POST',
                body,
                headers
            }
        );

        const json = await response.json();

        return json.data.AuthenticationResult.AccessToken;
    }


    return jwt;
}

module.exports = {
    get,
    post,
    put,
    delete: del
}