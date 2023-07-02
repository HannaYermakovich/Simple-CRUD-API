import { server } from '../server';

import request from 'supertest';
import { ErrorMessages, StatusCode } from '../const/const';
import { User } from '../const/types';
import { v4 as uuidv4 } from 'uuid';

describe('scenario 1', () => {
    const users: User[] = [];
    let userId: string = '';

    afterEach(async () => {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    });

    it('should return an empty array when no users exist', async () => {
        const res = await request(server)
            .get('/users/')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.OK);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data.length).toEqual(users.length);
    });

    it('should create a new user', async () => {
        const mockUser = {
            name: 'Adam',
            age: 30,
            hobbies: ['cars', 'books']
        };
        const res = await request(server)
            .post('/users/')
            .send(mockUser)
            .set('Accept', 'application/json')

        if (res.statusCode === StatusCode.CREATED) {
            users.push(res.body.data);
            //@ts-ignore
            mockUser.id = res.body.data.id
        }

        expect(res.statusCode).toEqual(StatusCode.CREATED);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data).toEqual(mockUser);
    });

    it('should get user by ID', async () => {
        userId = users[0]?.id;

        const res = await request(server)
            .get(`/users/${userId}`)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.OK);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data).toEqual(users[0]);
    });

    it('should update user by ID and return the updated user', async () => {
        userId = users[0]?.id;

        const newInfo = {
            name: 'Adam Tom',
            hobbies: ['programming']
        };

        const res = await request(server)
            .put(`/users/${userId}`)
            .send(newInfo)
            .set('Accept', 'application/json')

        if (res.statusCode === StatusCode.OK) {
            users[0] = {
                ...users[0],
                ...newInfo,
                hobbies: [...users[0].hobbies, ...newInfo.hobbies]
            }
        }

        expect(res.statusCode).toEqual(StatusCode.OK);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data).toEqual(users[0]);
    });

    it('should delete user by ID', async () => {
        userId = users[0]?.id;

        const res = await request(server)
            .delete(`/users/${userId}`)

        if (res.statusCode === StatusCode.SUCCESSFULLY_DELETED) {
            users.length = 0
        }

        expect(res.statusCode).toEqual(StatusCode.SUCCESSFULLY_DELETED);
        expect(users.length).toEqual(0);
    });

    it('should return Error when we are trying to get a deleted object by ID', async () => {
        const res = await request(server)
            .get(`/users/${userId}`)

        expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
        expect(res.text).toEqual(ErrorMessages.USER_NOT_FOUND);
    });
})

describe('scenario 2', () => {
    const users: User[] = [];
    let userId: string = '';

    afterEach(async () => {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    });

    it('should return an empty array when no users exist', async () => {
        const res = await request(server)
            .get('/users/')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.OK);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data.length).toEqual(users.length);
    });

    it('should create multiple users and return them all', async () => {
        const mockUsers = [
          { name: 'Tim', age: 25, hobbies: ['football', 'music'] },
          { name: 'Rob', age: 30, hobbies: ['reading', 'painting'] },
        ];
    
        for (const mockUser of mockUsers) {
          const res = await request(server)
            .post('/users/')
            .send(mockUser)
            .set('Accept', 'application/json');
    
          if (res.statusCode === StatusCode.CREATED) {
            users.push(res.body.data);
            //@ts-ignore
            mockUser.id = res.body.data.id;
          }
    
          expect(res.statusCode).toEqual(StatusCode.CREATED);
          expect(res.headers['content-type']).toEqual('application/json');
          expect(res.body.data).toEqual(mockUser);
        }
    
        const res = await request(server)
          .get('/users/')
          .set('Accept', 'application/json');
    
        expect(res.statusCode).toEqual(StatusCode.OK);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data).toEqual(users);
      });
})

describe('scenario 3', () => {
    const users: User[] = [];
    let userId: string = '';

    afterEach(async () => {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    });

    it('should return error when request on no exist endpoint', async () => {
        const res = await request(server)
            .get('/peple/')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
        expect(res.headers['content-type']).toEqual('text/plain');
        expect(res.text).toEqual(ErrorMessages.ENDPOINT_NOT_EXIST);
    });

    it('should return error when request body does not contain required fields', async () => {
        const mockUsers = [
            {
                name: 'Adam',
                age: 30,
            },
            {
                name: 'Adam',
                hobbies: ['cars', 'books']
            },
            {
                age: 30,
                hobbies: ['cars', 'books']
            },
        ];

        for(let mockUser of mockUsers) {
            const res = await request(server)
                .post('/users/')
                .send(mockUser)
                .set('Accept', 'application/json')
    
            expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
            expect(res.headers['content-type']).toEqual('text/plain');
            expect(res.text).toEqual(ErrorMessages.NOT_ALL_VALUES);
        }
    });

    it('should create a new user', async () => {
        const mockUser = {
            name: 'Adam',
            age: 30,
            hobbies: ['cars', 'books']
        };
        const res = await request(server)
            .post('/users/')
            .send(mockUser)
            .set('Accept', 'application/json')

        if (res.statusCode === StatusCode.CREATED) {
            users.push(res.body.data);
            //@ts-ignore
            mockUser.id = res.body.data.id
        }

        expect(res.statusCode).toEqual(StatusCode.CREATED);
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body.data).toEqual(mockUser);
    });

    it('should answer with status code 400 and corresponding message if userId is invalid', async () => {
        userId = users[0]?.id;
        
        const res = await request(server)
            .get(`/users/${userId}aa`)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
        expect(res.headers['content-type']).toEqual('text/plain');
        expect(res.text).toEqual(ErrorMessages.INVALID_USER_ID);
    });

    it('should answer with status code 404 and corresponding message if user id does not exist', async () => {
        userId = uuidv4();
        
        const res = await request(server)
            .get(`/users/${userId}`)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
        expect(res.headers['content-type']).toEqual('text/plain');
        expect(res.text).toEqual(ErrorMessages.USER_NOT_FOUND);
    });

    it('should answer with status code 400 and corresponding message if userId is invalid', async () => {
        userId = users[0]?.id;
        
        const res = await request(server)
            .put(`/users/${userId}aa`)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
        expect(res.headers['content-type']).toEqual('text/plain');
        expect(res.text).toEqual(ErrorMessages.INVALID_USER_ID);
    });

    it('should answer with status code 404 and corresponding message if user id does not exist', async () => {
        userId = uuidv4();
        
        const res = await request(server)
            .put(`/users/${userId}`)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
        expect(res.headers['content-type']).toEqual('text/plain');
        expect(res.text).toEqual(ErrorMessages.USER_NOT_FOUND);
    });
})