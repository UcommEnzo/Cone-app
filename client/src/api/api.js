import axios from "axios";

const instance = axios.create({
    baseURL: '/api/'
})

export const postValues = (h, r1, r2) =>{
    instance.post(`values`, {h, r1, r2})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })}