import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request:NextRequest) {
    try {
        //get all data using request.json()
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if use exist User has superpower
        const existinguser=await User.findOne({email}); //since its a database call u add await
        if(!existinguser)
        {
            return NextResponse.json({error:"User doesnt exist"},{status:400    });
            
        }

        //check if password correct
        const validPassword=await bcryptjs.compare(password,existinguser.password);
        if(!validPassword)
        {
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //create token data
        const tokenData={
            id:existinguser._id,   //  _id is used in mongodb to store user's id
            username:existinguser.username,
            email:existinguser.email
        }
        //create token
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})
        const response=NextResponse.json({
            message:"Login successful",
            success:true
        })
        //now we set jwt in user's cookies
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
}