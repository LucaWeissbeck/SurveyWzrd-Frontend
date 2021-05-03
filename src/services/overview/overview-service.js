import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const base_url = "http://127.0.0.1:8080";

export const getAllSurveys = () => {
    const url = base_url + '/api/survey/getForAdmin';
    return axios.get(url, {
        headers: {
            "x-api-key": cookies.get("authKey")
        }
    })
}

export const getAllSurveysOwner = () => {
    const url = base_url + '/api/survey/getAll';
    return axios.get(url, {
        headers: {
            "x-api-key": cookies.get("authKey")
        }
    })
}

export const getSurveyAnswerCount = (id) => {
    const url = base_url + `/api/analysis/public/${id}`;
    return axios.get(url);
}

export const getAnswerOptionsByID = (id) => {
    const url = base_url + `/api/survey/answeroptions/public/${id}`;
    return axios.get(url);
}

export const getSurveysByID = (id) => {
    const url = base_url + `/api/survey/public/${id}`;
    return axios.get(url);
}

export const getLocationInfo = (id) => {
    const url = base_url + `/api/analysis/public/rawdata/${id}`;
    return axios.get(url);
}

export const getSurveyResults = (id) => {
    const url = base_url + `/api/analysis/public/minimizedrawdata/${id}`;
    return axios.get(url)
}