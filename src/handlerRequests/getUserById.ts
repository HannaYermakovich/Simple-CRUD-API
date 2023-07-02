import { Request, Response } from "express";
import { ErrorMessages, StatusCode } from "../const/const";

import { validateUserId } from "../utils/validate";

const getUserById = async (db: any, req: Request, res: Response) => {
    const { isValidId, userId } = validateUserId(req.url);

    if (isValidId) {
        const user = db.get(userId);

        if (user) {
            res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: user
            }));
        } else {
            res.writeHead(StatusCode.NOT_FOUND, { 'Content-Type': 'text/plain' });
            res.end(ErrorMessages.USER_NOT_FOUND);
        }
    
    } else {
        res.writeHead(StatusCode.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end(ErrorMessages.INVALID_USER_ID);
    }
}

export default getUserById;