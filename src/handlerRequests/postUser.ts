import { Request, Response } from "express";

import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages, StatusCode } from "../const/const";
import checkRequiredKeys from '../utils/checkRequiredKeys';

const postUser = async (db: any, req: Request, res: Response) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const user = JSON.parse(body);
        const isValidUser = checkRequiredKeys(user);

        if (isValidUser) {
            user.id = uuidv4();

            db.set(user);

            res.writeHead(StatusCode.CREATED, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: user
            }));
        } else {
            res.writeHead(StatusCode.BAD_REQUEST, { 'Content-Type': 'text/plain' });
            res.end(ErrorMessages.NOT_ALL_VALUES);
        }

    });
}

export default postUser;