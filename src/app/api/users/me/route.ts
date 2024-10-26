import { getDataFromToken } from "@/helpers/getDataFromToken";
 
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        //get everything in user except password
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}