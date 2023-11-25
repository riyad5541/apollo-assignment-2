import { UserModel } from "../user.model";
import { Orders, User } from "./user.interface";

const createUserIntoDB = async (user: User)=>{


    if(await UserModel.isUserExists(user.userId)){
        throw new Error('user already exists');
     }else if (await UserModel.isEmailExists(user.username)){
        throw new Error('User already exists')
     }

    const result = await UserModel.create(user)
    const resultWithoutPassword = await UserModel.findById(result._id).select({password:0})

    

    return resultWithoutPassword;
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


const addNewProductsIntoDB = async(id:number, newOrder: Orders) =>{
    const {productName, price, quantity} = newOrder;
    if(await UserModel.isUserNotExits(id)){
        throw new Error(`user with userId ${id} not found`);
    }

    // eslint-disable-next-line prefer-const
    let user = await UserModel.findOne({userId: id});
    if(!user){
        throw new Error(`user with userId ${id}not found.`);
    }

    if(user.orders){
        user.orders.push({
            productName,price,quantity
        })
    }else{
        user.orders = [{productName, price, quantity}];
    }

    const result = await user.save();

    return result;
}



const retriveOrderesSpecificUserDB = async (id:number) =>{
    if(await UserModel.isUserNotExits(id)){
        throw new Error(`user with userId ${id} not found.`)
    }
    const result = await UserModel.aggregate([
        {$match: {userId: id}},
        {$project:{_id:0, orders:1}}
    ])
    const orders = result[0];
    return orders
}


const calculateTotalPriceForAUserDB = async(id:number) =>{
    if(await UserModel.isUserNotExits(id)){
        throw new Error(`user with userId ${id} not found.`)
    }
    const result = await UserModel.aggregate([
        {$match: {userId: id}},
        {$unwind:'$orders'},
        {
            $group:{
                _id:null,
                totalPrice:{
                    $sum:{$multiply:['$orders.price', '$orders.quantity']},
                },
            },
        },
        {$project:{_id:0, totalPrice:1}},
    ])
    const totalPrice = result[0].totalPrice;

    return totalPrice;   
}


export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateAUserByID,
    addNewProductsIntoDB,
    retriveOrderesSpecificUserDB,
    calculateTotalPriceForAUserDB
}