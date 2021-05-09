import axios from "axios";

export const postLogin = (email, password) => {
    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        url: 'http://localhost:8080/api/administrator/public/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);

}
