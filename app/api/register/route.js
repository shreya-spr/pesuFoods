import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// POST REQUEST

export async function POST(request) {
    // Replace the uri string with your connection string.
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    
    try {
        const { name, email, password } = await request.json();
        //const hashedPassword = await bcrypt.hash(password, 10);
        // await connectMongoDB();
        //await User.create({ name, email, password: hashedPassword });

        console.log("Name: ", name);
        
        console.log("Email: ", email);
        console.log("Pass: ", password);
        return NextResponse.json({ message: "User registered." }, { status: 201 });
      } catch (error) {
        return NextResponse.json(
          { message: "An error occurred while registering the user." },
          { status: 500 }
        );
      } finally {
        await client.close();
      }
    }
