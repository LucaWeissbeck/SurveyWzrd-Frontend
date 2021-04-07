import React from 'react';
import axios from 'axios';


export const getSurveysByID = (id) => {
    const url = `http://localhost:8080/api/survey/public/${id}`;
    return axios.get(url);
}

export const getAnswerOptionsByID = (id) => {
    const url = `http://localhost:8080/api/survey/answeroptions/public/${id}`;
    return axios.get(url);
}


export const postSurveyAnswerSingle = (id, payload) => {
    const url = `http://localhost:8080/api/surveyfeedback/public/single/${id}`;
    return axios.post(url, payload);
}

export const postSurveyAnswerMutliple = (id, payload) => {
    const url = `http://localhost:8080/api/surveyfeedback/public/multiple/${id}`;
    return axios.post(url, payload);
}

export const getSurveyAnswersAnalysis = (id) => {
    const url = `http://localhost:8080/api/analysis/public/minimizedrawdata/${id}`;
    return axios.get(url);
}

