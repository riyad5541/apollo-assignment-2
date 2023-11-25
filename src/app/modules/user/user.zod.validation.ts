import { z } from "zod";

const zodUserFullName = z.object({
    firstName:z.string().min(1,{
        message:'first name must not be empty'
    }),
    lastName:z.string().min(1,{
        message:'last name must not be empty'
    }),
});

const zodAddress = z.object({
    street:z.string().min(1,{
        message:'street must not be empty'
    }),
    city:z.string().min(1,{
        message:'city must not be empty'
    }),
    country:z.string().min(1,{
        message:'country must not be empty'
    }),
});


const zodOrders = z.object({
    productName:z.string().min(1,{
        message:'product name must not be empty'
    }),
    price:z.number().min(0,{
        message:'price must be positive number'
    }),
    quantity:z.number().min(1,{
        message:'quantity must be at least 1'
    }),
})


const zodUserValidation = z.object({
    userId:z.number().int({
        message:'user id must be integer'
    }),
    username:z.string().min(1,{
        message:'user name must not be empty'
    }),
    password:z.string().min(8,{
        message:'password must be 8 characters'
    }),
    fullName:zodUserFullName,
    age:z.number().min(0,{
        message:'age must be non-negative number'
    }),
    email:z.string().email({
        message:'invalid email format'
    }),
    isActive:z.boolean().default(true),
    hobbies:z.array(z.string().min(1,{
        message:'hobby must not be empty'
    })),
    address:zodAddress,
    orders:z.array(zodOrders).optional(),
    isDeleted: z.boolean().default(false),

});


export default zodUserValidation;