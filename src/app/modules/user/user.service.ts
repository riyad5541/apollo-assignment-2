import { UserModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (user: User)=>{


    if(await UserModel.isUserExists(user.userId)){
        throw new Error('user already exists');
     }

    const result = await UserModel.create(user)

    

    return result;
}

const getAllUsersFromDB = async ()=>{
    const result = await UserModel.find();
    return result;
}

const getSingleUserFromDB = async (userId:string)=>{
    const result = await UserModel.findOne({userId});
    return result;
}


const deleteUserFromDB = async (id:number)=>{
    if(await UserModel.isUserNotExits(id)){
        throw new Error('user does not exits')
    }
    const result = await UserModel.deleteOne({userId:id});
    return result;
}



export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
}