import { Schema, model } from 'mongoose';
import { FullName, User, UserAddress, } from './user/user.interface';


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

const userSchema = new Schema<User>({
    userId:{type: Number, unique:true },
    username:{type:String},
    password:{type: String},
    fullName:userFullNameSchema,
    age:{type:Number},
    email:{type: String},
    isActive:{type:Boolean},
    hobbies:{type:[String]},
    address:userAddressSchema,
})


export const UserModel = model<User>('User',userSchema);