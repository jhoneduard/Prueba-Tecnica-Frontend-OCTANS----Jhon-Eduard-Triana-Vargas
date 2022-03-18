import { Rol } from '../models/Rol';
export class User {
    id: number;
    rol: Rol | undefined;
    name: string;
    active: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.active = '';
    }
}