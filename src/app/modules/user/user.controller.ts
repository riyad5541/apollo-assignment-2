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
            message:'Users fetched succesfully',
            data: result,
        });
    }catch(error: any){
        res.status(404).json({
            success:false,
            message:'failed to fetch all users',
            error:{
                code:404,
                description:'failed to fetch all users',
            },
        })
    }
}


const getSingleUser = async(req:Request , res:Response) =>{
    try{

        const {userId} = req.params;


        const result = await UserServices.getSingleUserFromDB(Number(userId))

        res.status(200).json({
            success:true,
            message:'User is retrived succesfully',
            data: result,
        });
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


const updateAUser = async (req:Request, res:Response) =>{
    try{
        const {userId} = req.params;
        const updatedDoc = req.body;
        const result = await UserServices.updateAUserByID(Number(userId), updatedDoc)

        res.status(200).json({
            success:true,
            message:'User updated succesfully',
            data: result,
        });
    }catch(error: any){
        res.status(404).json({
            success:false,
            message:'User not found',
            error:{
                code:404,
                description:error.message,
            },
        })
    }
}


const deleteUser = async(req:Request , res:Response) =>{
    try{

        const {userId} = req.params;

    await UserServices.deleteUserFromDB(Number(userId))

        res.status(200).json({
            success:true,
            message:'User is deleted succesfully',
            data: null,
        });
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


const addANewProductOrder = async(req:Request, res:Response) =>{
    try{
        const {userId} = req.params;
        const newOrder = req.body;

        const result = await UserServices.addNewProductsIntoDB(Number(userId),newOrder)

        res.status(200).json({
            success:true,
            message:'order created successfully',
            data: result,
        });
    }catch(error: any){
        res.status(500).json({
            success:false,
            message:'User not found',
            error:{
                code:404,
                description:error.message,
            },
        })
    }
}


const retriveOrdersSpecificUser = async(req:Request,res:Response) =>{
    try{
        const {userId} = req.params;
        const orders = await UserServices.retriveOrderesSpecificUserDB(Number(userId))

        res.json({
            success:true,
            message:'order fetched successfully',
            data: orders,
        });
    }catch(error: any){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


export const UserControllers ={
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateAUser,
    addANewProductOrder,
    retriveOrdersSpecificUser,
}