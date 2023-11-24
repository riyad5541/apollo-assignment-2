import { Request, Response } from "express";
import { UserServices } from "./user.service";
import zodUserValidation from "./user.zod.validation";

const createUser = async (req:Request , res:Response) =>{
  
    try{
        const {user:userData} = req.body;

        const userZodparsedData = await zodUserValidation.parse(userData);


    const result = await UserServices.createUserIntoDB(userZodparsedData);


    res.status(200).json({
        success:true,
        message:'User is created succesfully',
        data: result,
    })
    }catch(error: any){
        res.status(404).json({
            success:false,
            message:'User creation failed',
            error:{
                code:404,
                description:error.message,
            },
        })
    }
}

const getAllUsers = async(req:Request , res:Response) =>{
    try{
        const result = await UserServices.getAllUsersFromDB()

        res.status(200).json({
            success:true,
            message:'Users are retrived succesfully',
            data: result,
        });
    }catch(err){
        console.log(err)
    }
}


const getSingleUser = async(req:Request , res:Response) =>{
    try{

        const {userId} = req.params;


        const result = await UserServices.getSingleUserFromDB(userId)

        res.status(200).json({
            success:true,
            message:'User is retrived succesfully',
            data: result,
        });
    }catch(err){
        console.log(err)
    }
}

export const UserControllers ={
    createUser,
    getAllUsers,
    getSingleUser,
}