import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const postSurveyQuestionSingle = (payload) => {
    const url = `http://localhost:8080/api/survey/`;
    let axiosConfig = {
        headers: {
            'x-api-key': cookies.get('authKey'),
        }
    };

    return axios.post(url, payload, axiosConfig);
}

export const postSurveyAnswerOptionSingle = (payload, surveyID) => {
    const url = `http://localhost:8080/api/survey/answeroptions/` + surveyID
    let axiosConfig = {
        headers: {
            'x-api-key': cookies.get('authKey'),
        }
    };

    return axios.post(url, payload, axiosConfig);
}