import {  User } from "../const/types";

interface Database {
    [id: string]: User
}

export class InMemoryDataBase {
    private db: Database = {};

    public set(user: User, value?: string): void {
        if (value === 'update') {
            if (this.db[user.id]) {
                this.db[user.id] = user;
            }
        } else if (value === 'delete') {
            delete this.db[user.id];
        } else {
            this.db[user.id] = user;
        }
    }

    public get(id?: string): User | User[] {
        if (id) {
            return this.db[id]
        }
        const users = Object.values(this.db);
        return users;
    }
}