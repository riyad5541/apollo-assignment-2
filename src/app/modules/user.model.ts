import { Schema, model } from 'mongoose';
import { FullName, User, UserAddress, UserInterfaceModel, } from './user/user.interface';


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
});


userSchema.pre('save',async function(){
    
})



userSchema.statics.isUserExists = async function (id: number){
    const existingUser = await UserModel.findOne({userId: id});
    return existingUser;
}


export const UserModel = model<User,UserInterfaceModel>('User',userSchema);