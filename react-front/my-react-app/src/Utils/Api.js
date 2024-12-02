const BASE_URL = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2';

const getHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (includeAuth) {
        const token = localStorage.getItem('authToken');
        console.log('Token retrieved:', token);

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
};


export { BASE_URL, getHeaders };
