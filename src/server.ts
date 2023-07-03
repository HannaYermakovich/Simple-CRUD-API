import * as http from 'http';
import * as dotenv from 'dotenv';
import { Request, Response } from "express";

import getAllUsers from './handlerRequests/getAllUsers';
import getUserById from './handlerRequests/getUserById';
import postUser from './handlerRequests/postUser';
import putUser from './handlerRequests/putUser';
import deleteUser from './handlerRequests/deleteUser';
import { validateURL } from './utils/validate';
import { Methods } from './const/types';
import { ErrorMessages, StatusCode } from './const/const';
import { InMemoryDataBase } from './database/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const server = http.createServer();

const db = new InMemoryDataBase();

server.on('request', async (req: Request, res: Response) => {    
    try {
        const { isValidAPI, userId } = validateURL(req.url);

        if (isValidAPI) {
    
            const METHODS: Methods = {
                GET: () => {
                    if (userId) {
                        getUserById(db, req, res);
                    } else {
                        getAllUsers(db, req, res);
                    }
                },
                POST: () => {
                    postUser(db, req, res);
                },
                PUT: () => {
                    putUser(db, req, res);
                },
                DELETE: () => {
                    deleteUser(db, req, res);
                }
            }
    
            METHODS[req.method]();
        } else {
            res.writeHead(StatusCode.NOT_FOUND, { 'Content-Type': 'text/plain' });
            res.end(ErrorMessages.ENDPOINT_NOT_EXIST);
        }
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(StatusCode.SERVICE_ERROR, { 'Content-Type': 'text/plain' });
        res.end(ErrorMessages.SERVICE_ERROR);
    }
})

server.listen(PORT, () => {
    console.log(`Listening a port ${PORT}`)
})