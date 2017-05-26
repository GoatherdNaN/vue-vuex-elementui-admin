import * as URL from '../constants/url';
import {request} from 'request';
const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
export const login = (params) => request(URL.LOGIN, params, METHOD.POST);
//入库
export const getInstockList = (params) => request(URL.GET_INSTOCK_DATA, params, METHOD.POST);
export const instockEdit = (params) => request(URL.INSTOCK_EDIT, params, METHOD.POST);
export const newInstockList = (params) => request(URL.NEW_INSTOCK_LIST, params, METHOD.POST);
export const deleleItem = (params) => request(URL.INSTOCK_DELETE, params, METHOD.GET);
//统计
export const getStatisticsData = (params) => request(URL.GET_STATISTICS_DATA, params, METHOD.POST);
