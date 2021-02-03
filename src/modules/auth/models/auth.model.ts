// export interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//}
export class Admin {
    phone: string;
    password: string;
    device_token = '1234aHHHH';
    constructor(phone: string, password: string) {
        this.phone = phone;
        this.password = password;
    }
}
export class Admin1 {
    id: number;
    roleId: number;
    phone: string;
    token: string;

    constructor(
        public _id: number,
        public _roleId: number,
        public _phone: string,
        public _token: string
    ) {
        this.id = _id;
        this.phone = _phone;
        this.token = _token;
        this.roleId = _roleId;
    }
}
export class User {
    phone: string;
    password: string;
    constructor(phone: string, password: string) {
        this.phone = phone;
        this.password = password;
    }
 }
