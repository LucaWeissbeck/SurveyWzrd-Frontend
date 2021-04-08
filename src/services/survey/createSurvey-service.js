import React from 'react';
import axios from 'axios';

export const postSurveyQuestionSingle = (payload) => {
    const url = `http://localhost:8080/survey/addSurvey/${id}`;
    return axios.post(url, payload);
}
