import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request) {
// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

  try {
    const database = client.db('pesuFoods');
    const foodItems = database.collection('parkingLot');
    const query = {  };
    const items = await foodItems.find(query).toArray();

   // Group items by cuisine
   const groupedItems = {};
   items.forEach(item => {
     const { cuisine } = item;
     if (!groupedItems[cuisine]) {
       groupedItems[cuisine] = [item];
     } else {
       groupedItems[cuisine].push(item);
     }
   });

    return NextResponse.json({ success:true, items})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


// POST REQUEST

export async function POST(request) {
    // Replace the uri string with your connection string.
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    
      try {
        const database = client.db('pesuFoods');
        const foodItems = database.collection('parkingLot');
        const items = await foodItems.insertOne(body);
        return NextResponse.json({ items })
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    
