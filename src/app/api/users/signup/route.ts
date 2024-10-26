import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    // Grab data from the body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email }); // Changed to `findOne` for a single user lookup
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword, // Corrected from `passsword`
      email
    });
    console.log("New User before saving:", newUser); 
    const savedUserResponse = await newUser.save();
    console.log(savedUserResponse);

                      //first email is to whom u want to send email
    await sendEmail({email,emailType:"VERIFY",userId:savedUserResponse._id})

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUserResponse
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
