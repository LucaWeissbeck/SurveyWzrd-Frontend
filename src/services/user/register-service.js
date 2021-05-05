import axios from "axios";

export const postRegister = (email, password) => {
    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        url: 'http://localhost:8080/api/administrator/public/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);

}
