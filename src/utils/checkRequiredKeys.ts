import { User } from "../const/types";

const checkRequiredKeys = (user: User) => {
    let isAllStrings = false;
    const requiredKeys = ['name', 'age', 'hobbies'];

    const isAllRequired = requiredKeys.every((key) => user.hasOwnProperty(key));
    const isArray = Array.isArray(user['hobbies']);

    if(isArray) {
        isAllStrings = user['hobbies'].every((value) => typeof value === 'string');
    }

    return isAllRequired && isArray && isAllStrings;
}

export default checkRequiredKeys;