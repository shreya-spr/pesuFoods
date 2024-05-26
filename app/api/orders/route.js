import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { items, totalAmount, createdAt } = await request.json();
    
    // Check if required fields are provided
    if (!items || !totalAmount || !createdAt) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('pesuFoods');
    const ordersCollection = database.collection('orders');

    const result = await ordersCollection.insertOne({
      items,
      totalAmount,
      createdAt
    });

    return NextResponse.json({ success: true, orderId: result.insertedId });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false, error: 'Failed to save order' }, { status: 500 });
  } finally {
    await client.close();
  }
}


// display pending orders to admin
export async function GET() {
    try {
      await client.connect();
      const database = client.db('pesuFoods');
      const ordersCollection = database.collection('orders');
      const orders = await ordersCollection.find({}).toArray();
  
      return NextResponse.json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
    } finally {
      await client.close();
    }
}

// delete orders once done
export async function DELETE(request) {
    const { orderId } = await request.json();
  
    try {
      await client.connect();
      const database = client.db('pesuFoods');
      const ordersCollection = database.collection('orders');
      const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });
  
      return NextResponse.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      console.error('Error deleting order:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete order' }, { status: 500 });
    } finally {
      await client.close();
    }
}
