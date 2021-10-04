//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = "http://localhost:1337"

const fetchEnhance = (endpoint, data = {}, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    return fetch(url);
}

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    
    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}


const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchSinToken,    
    fetchConToken,
    fetchEnhance
}