import axios from 'axios';

export default function({url, ...params}){
    return axios({
        url: `${process.env.REACT_APP_BACKEND}${url}`,
        ...params
    })
}