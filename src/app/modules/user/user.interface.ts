import { Model } from "mongoose";

export type FullName = {
    firstName: string;
    lastName: string;
}

export type UserAddress = {
    street:string;
    city:string;
    country:string;
}

export type Orders = {
    productName:string;
    price:number;
    quantity:number;
}

export type User = {
    userId:number;
    username:string;
    password:string,
    fullName: FullName;
    age: number;
    email: string;
    isActive:boolean;
    hobbies:string[];
    address:UserAddress;
    orders?:Orders[];
    isDeleted:boolean;
  }


export interface UserInterfaceModel extends Model<User>{
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: number):Promise<User | null>;
    // eslint-disable-next-line no-unused-vars
    isUserNotExits(id:number):Promise<User | null>
}
