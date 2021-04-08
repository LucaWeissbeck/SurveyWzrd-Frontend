import React from 'react';
import axios from 'axios';

export const postSurveyQuestionSingle = (payload) => {
    const url = `http://api.tutorialfactory.org:8088/api/survey/`;
    let axiosConfig = {
        headers: {
            'x-api-key' : 'Test',
        }
    };

    return axios.post(url, payload, axiosConfig);
}
