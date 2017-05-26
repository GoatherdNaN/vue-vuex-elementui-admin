import qs from 'querystring';
import store from '../vuex/index';
import axios from 'axios';
import {LOADING} from '../constants/type'
const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
export const request = (url, params, method = 'post', cache = false, jsonType = true) => {
    store.commit(LOADING, true);
    let options = {
        url:'/admin'+url,
        headers: {
            'Content-Type': jsonType
                ? 'application/json;charset=UTF-8'
                : 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method
    };
    if (process.env.NODE_ENV != "production") {
        options.headers.userId = "1";
    }
    if (method !== METHOD.GET && params) {
        options.data = jsonType
            ? JSON.stringify(params)
            : qs.stringify(params)
    }
    if (method === METHOD.GET && qs.stringify(params)!=="") {
        options.url += ('?' + qs.stringify(params));
    }
    if (method === METHOD.GET && cache) {
        let back = cacheUrl(url);
        if (back) {
            return new Promise((resolve, reject) => {
                resolve(JSON.parse(back));
            });
        }
    }
    let promise = axios(options).then(checkRespStatus);
    // catch 返回一个 promise,可以继续调用 then
    promise.catch((e) => {
        store.commit(LOADING, false);
    });
    return promise;
}
let cacheUrl = url => {
    let fullUrl = window.location.origin + url;
    if (sessionStorage.hasOwnProperty(fullUrl)) { //有这个key
        if ("0" != sessionStorage.getItem(fullUrl)) {
            return sessionStorage.getItem(fullUrl);
        }
    } else {
        sessionStorage.setItem(fullUrl, "0");
    }
}
let setCache = (url, data) => {
    if (sessionStorage.hasOwnProperty(url) && sessionStorage.getItem(url) == "0") {
        sessionStorage.setItem(url, JSON.stringify(data));
    }
}
const checkRespStatus = (respPromise) => {
    store.commit(LOADING,false);
    if (respPromise.status !== 200) {
        alert('Server error occurred');
        console.log('Server error occurred');
        return Promise.reject();
    }
    let resp = respPromise.data;
    return new Promise((resolve, reject) => {
        if (resp && resp.code === 200) {
            setCache(respPromise.url,resp.data);
            resolve(resp.data);
        } else {
            alert(resp.msg || "response error occoured");
            reject(resp);
        }
    });
};
