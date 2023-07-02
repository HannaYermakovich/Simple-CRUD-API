import * as fs from 'fs';
import { Request, Response } from "express";

import { validateUserId } from "../utils/validate";
import { User } from '../const/types';
import { ErrorMessages, ResponseMessages, StatusCode } from '../const/const';

const deleteUser = async (db: any, req: Request, res: Response) => {
    const { isValidId, userId } = validateUserId(req.url);

    if (isValidId) {
        const user = db.get(userId);

        if (user) {
            db.set(user, 'delete');

            res.writeHead(StatusCode.SUCCESSFULLY_DELETED, { 'Content-Type': 'text/plain' });
            res.end(ResponseMessages.SUCCESSFULLY_DELETED);
        } else {
            res.writeHead(StatusCode.NOT_FOUND);
            res.end(ErrorMessages.USER_NOT_FOUND);
        }
    } else {
        res.writeHead(StatusCode.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end(ErrorMessages.INVALID_USER_ID);
    }
};

export default deleteUser;