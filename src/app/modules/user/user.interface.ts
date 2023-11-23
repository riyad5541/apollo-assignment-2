export type UserName = {
    firstName: string;
    lastName: string;
}

export type UserAddress = {
    street:string;
    city:string;
    country:string;
}

export type User = {
    userId:number;
    userName:string;
    fullName: UserName;
    email: string;
    age: number;
    isActive:boolean;
    // hobbies:string[];
    address:UserAddress;
  }