import React from 'react';
import axios from 'axios';

export const postSurveyQuestionSingle = (payload) => {
    const url = `http://localhost:8080/api/survey/`;
    let axiosConfig = {
        headers: {
            'x-api-key' : 'Test',
        }
    };

    return axios.post(url, payload, axiosConfig);
}

export const postSurveyAnswerOptionSingle = (payload, surveyID) => {
    const url = `http://localhost:8080/api/survey/answeroptions/` + surveyID
    let axiosConfig = {
        headers: {
            'x-api-key' : 'Test',
        }
    };

    return axios.post(url, payload, axiosConfig);
}