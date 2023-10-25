
import axios from 'axios'


//creating a common structure for all api requests

export const commonRequest = async (method, url, body, header) => {
    let config = {
        method,
        url,
        headers: header ? header : "application/json",
        data: body
    }
    return axios(config).then(res => {
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        return err
    })
}