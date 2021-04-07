import React from 'react';
import axios from 'axios';

//We need a requ
const apiKeyHeader = {
    'x-api-key': 'Test'
}

export const getAllSurveys = () => {
    let config = {
        method: 'get',
        url: 'http://localhost:8080/api/survey/getForAdmin',
        headers: {
            'x-api-key': 'Test'
        }
    };

    return axios(config);
}

export const getSurveyAnswerCount = (id) => {
    const url = `http://localhost:8080/api/analysis/public/${id}`;
    return axios.get(url);
}

export const getAnswerOptionsByID = (id) => {
    const url = `http://localhost:8080/api/survey/answeroptions/public/${id}`;
    return axios.get(url);
}

export const getSurveysByID = (id) => {
    console.log(id)
    const url = `http://localhost:8080/survey/public/${id}`;
    return axios.get(url);
}
