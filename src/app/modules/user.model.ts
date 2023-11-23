import { Schema, model } from 'mongoose';
import { User, UserAddress, UserName } from './user/user.interface';


const userFullNameSchema = new Schema<UserName>(
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

const userAssressSchema = new Schema<UserAddress>(
    {
        street: String,
        city: String,
        country:String,
    }
)

const userSchema = new Schema<User>({
    userId:{type: Number },
    userName:{
        type:String,
        required: true,
    },
    fullName:userFullNameSchema,
    email:{type: String , required:true},
    age:{type:Number},
    isActive:{type:Boolean},
    address:userAssressSchema,
})


const User = model<User>('User',userSchema)