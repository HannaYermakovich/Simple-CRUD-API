import { USERS } from "../const/const";
import { ValidateId, ValidateURL } from "../const/types";

export const validateUserId = (request: string): ValidateId => {
    const [ _, userId ] = request.split('/').filter(el => el !== '');

    return ({ 
        isValidId: userId.length === 36,
        userId
    });
};

export const validateURL = (request: string): ValidateURL => {
    const [ api, userId ] = request.split('/').filter(el => el !== '');
    
    const isValidAPI = api.length === USERS.length && api === USERS;

    return ({ 
        isValidAPI,
        api,
        userId
    });
};