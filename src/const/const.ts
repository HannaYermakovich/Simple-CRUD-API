export const USERS: string= 'users';

export const enum StatusCode {
    OK = 200,
    CREATED = 201,
    SUCCESSFULLY_DELETED = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SERVICE_ERROR = 500
}

export const enum ErrorMessages {
    USER_NOT_FOUND = 'User with this id was not found. Try again',
    INVALID_USER_ID = 'Invalid user ID. Try again',
    NOT_ALL_VALUES = 'Please, add all necessary values for user.',
    ENDPOINT_NOT_EXIST = 'This endpoint is not exist. Please, enter correct endpoint',
    SERVICE_ERROR = 'Something went wrong! Please, try again later!'
}

export const enum ResponseMessages {
    SUCCESSFULLY_DELETED = 'User was successfully deleted!'
}