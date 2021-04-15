import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const postDeleteSurvey = (surveyID) => {
    let config = {
        method: 'delete',
        url: 'http://localhost:8080/api/survey/' + surveyID,
        headers: {
            'x-api-key' : cookies.get('authKey'),
        },
    };

    return axios(config);

}