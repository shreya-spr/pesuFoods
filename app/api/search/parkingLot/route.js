import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")
    
// Replace the uri string with your connection string.
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        const database = client.db('pesuFoods');
        const foodItems = database.collection('parkingLot');
        
        const items = await foodItems.aggregate([{
            $match: {
              $or: [
                { name: { $regex: query, $options: "i" } },
              ]
            }
        }]).toArray()
        
    return NextResponse.json({ success:true, items})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}