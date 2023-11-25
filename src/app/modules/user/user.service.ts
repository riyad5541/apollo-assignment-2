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
    const result = await UserModel.aggregate(
        [
            {
                $project:{
                    _id:0,
                    username:1,
                    fullName:1,
                    age:1,
                    email:1,
                    address:1,
                }
            }
        ]
    );
    return result;
}

const getSingleUserFromDB = async (id:number)=>{

    if(await UserModel.isUserNotExits(id)){
        throw new Error('User does not exist')
    }
    const result = await UserModel.aggregate([
        {$match: {userId:id}},
        {$project:{password:0,orders:0,isDeleted:0}},
    ]);
    return result;
}


const updateAUserByID = async (id:number, updatedDoc: User) =>{
    if(await UserModel.isUserNotExits(id)){
        throw new Error('user does not exist')
    }

    const result = await UserModel.findOneAndUpdate({userId: id},updatedDoc,{new: true,}).select({password: 0});

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
    updateAUserByID,
}