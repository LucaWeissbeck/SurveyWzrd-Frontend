import React from 'react';
import axios from 'axios';


export const getSurveysByID = (id) => {
    const url = `http://localhost:8080/survey/public/${id}`;
    return axios.get(url)

}

export const getAnswerOptionsByID = (id) => {
    const url = `http://localhost:8080/survey/answeroptions/public/${id}`;
    return axios.get(url);
}

export const postSurveyAnswer = (id, payload) => {
    const url = `http://localhost:8080/surveyfeedback/public/${id}`;
    return axios.post(url, payload)
}


