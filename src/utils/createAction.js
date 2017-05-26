export const createAction = (type, payloadCreator, metaCreator) =>{
    const identity = (...args) => args[0];
    const isFunc = (fn) => typeof(fn) === 'function';
    const isPromise = obj => typeof(obj) === 'object' && isFunc(obj.then);
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity;
    return ({commit, dispatch}, ...args) =>{
        const payload = finalPayloadCreator(...args);
        const action = {type, payload};
        if(isFunc(metaCreator)){
            action.meta = metaCreator(...args);
        }
        if(isPromise(payload)){
            return payload.then(result =>{
                commit(type, Object.assign(action, {payload: result}));
                //返回对应业务逻辑commit之后需要做的业务操作，这里将结果通过promise返回
                return Promise.resolve(result);
            }).catch(error =>{
                // commit(type, Object.assign(action, {error: true, msg: error.msg}));
                return Promise.reject({error: true, msg: error.msg});
            });
        }
        return commit(type, Object.assign(action, {payload}));
    };
};
