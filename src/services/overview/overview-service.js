import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

//We need a requ
const apiKeyHeader = {
    'x-api-key': cookies.get('authKey')
}

export const getAllSurveys = () => {
    let config = {
        method: 'get',
        url: 'http://localhost:8080/api/survey/getForAdmin',
        headers: {
            'x-api-key': cookies.get('authKey')
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
    const url = `http://localhost:8080/api/survey/public/${id}`;
    return axios.get(url);
}

export const getLocationInfo = (id) => {
    const url = `http://localhost:8080/api/analysis/public/rawdata/${id}`;
    return axios.get(url);
}
