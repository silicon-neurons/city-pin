import axios from 'axios';

export default function({url, ...params}){
    return axios({
        url: url.search('http')>=0 ? url :`${process.env.REACT_APP_BACKEND}${url}`,
        ...params
    })
}