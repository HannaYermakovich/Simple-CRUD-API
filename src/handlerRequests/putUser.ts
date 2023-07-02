import { Request, Response } from "express";

import { validateUserId } from "../utils/validate";
import { ErrorMessages, StatusCode } from '../const/const';

const putUser = async (db: any, req: Request, res: Response) => {
    const { isValidId, userId } = validateUserId(req.url);

    if (isValidId) {
        const user = db.get(userId);

        if (user) {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const updatedInfo = JSON.parse(body);
                
                const updatedUser = {
                    ...user, 
                    ...updatedInfo,
                    hobbies: [...user.hobbies, ...updatedInfo.hobbies]
                };
                
                db.set(updatedUser, 'update');

                res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: updatedUser
                }));
            });
        } else {
            res.writeHead(StatusCode.NOT_FOUND);
            res.end(ErrorMessages.USER_NOT_FOUND);
        }
    } else {
        res.writeHead(StatusCode.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end(ErrorMessages.INVALID_USER_ID);
    }

};

export default putUser;