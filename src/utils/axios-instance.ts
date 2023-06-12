import axios from 'axios';

export const axiosInstance = async () => {
    // you need to be careful in next.js for adding cookies.
    // You could be on the server or on client. this code will work for client assuming that you will be using on client side
    // I belive you are using `parser` to get cookies. get the token
    // const yourToken = "whatever"
    const timeout = Number(localStorage.getItem('timeout'));
    const token = localStorage.getItem('authToken');
    const axiosClient = axios.create({
        baseURL: 'https://coffee-supplier.adey-bsm.de',
        timeout: timeout,
        headers: {
            'Accept': 'application/vnd.GitHub.v3+json',
            'Authorization': `Bearer ${token}`
        }
    });
    return axiosClient
}