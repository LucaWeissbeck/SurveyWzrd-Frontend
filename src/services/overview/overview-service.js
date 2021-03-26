import React from 'react';
import axios from 'axios';

//We need a requ
const apiKeyHeader = {
    'x-api-key': 'Test'
}

export const getAllSurveys = () => {
    let config = {
        method: 'get',
        url: 'http://localhost:8080/survey/getForAdmin',
        headers: {
            'x-api-key': 'Test'
        }
    };

    return axios(config);
}
