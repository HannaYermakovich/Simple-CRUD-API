import { Request, Response } from "express";
import { StatusCode } from "../const/const";

const getAllUsers = async (db: any, req: Request, res: Response) => {
    const users = db.get();

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: users
    }));
}

export default getAllUsers;