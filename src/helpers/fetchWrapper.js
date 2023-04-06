let accessTokenValue = localStorage.getItem('accessToken')

const logout = () => {
    localStorage.clear()
}

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const accessToken = accessTokenValue;
    const isLoggedIn = accessToken ? true : false;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.json().then(data => {
        // const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && accessTokenValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout()
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const apiFetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

export default apiFetchWrapper