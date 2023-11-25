import { Schema, model } from 'mongoose';
import { FullName, Orders, User, UserAddress, UserInterfaceModel, } from './user/user.interface';
import bcrypt from 'bcrypt'
import config from '../config';


const userFullNameSchema = new Schema<FullName>(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        }

    }
)

const userAddressSchema = new Schema<UserAddress>(
    {
        street: String,
        city: String,
        country:String,
    }
)


const ordersSchema = new Schema<Orders>({
    productName:{type:String},
    price:{type:Number},
    quantity:{type:Number},
})


const userSchema = new Schema<User, UserInterfaceModel>({
    userId:{type: Number, unique:true },
    username:{type:String},
    password:{type: String},
    fullName:userFullNameSchema,
    age:{type:Number},
    email:{type: String},
    isActive:{type:Boolean},
    hobbies:{type:[String]},
    address:userAddressSchema,
    orders:[ordersSchema],
    isDeleted:{type:Boolean},
});


userSchema.pre('save',async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
next();
})



userSchema.statics.isUserExists = async function (id: number){
    const existingUser = await UserModel.findOne({userId: id});
    return existingUser;
}

userSchema.statics.isEmailExists = async function(username:string){
    const existedUsername = await UserModel.findOne({username});
    return existedUsername;
}

userSchema.statics.isUserNotExits = async function(id:number){
    const existingUser = await UserModel.findOne({userId: id});
    return existingUser === null;
}


export const UserModel = model<User,UserInterfaceModel>('User',userSchema);