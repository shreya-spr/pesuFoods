"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
// import title from "../../public/images/title.png";
import Link from 'next/link';
import styles from "../../styles/admin.module.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId })
      });

      const data = await response.json();
      if (data.success) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('An error occurred while deleting the order:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.parentContainer}>
      {/* <div >
        <Image src={title} alt={"logo"} />
      </div> */}

        <div className={styles.signOutBtn}>
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>

        <div className={styles.dashHeader}>
          <h2>Your orders</h2>
        </div>

      <div className={styles.ordersContainer}>
        {orders.length === 0 ? (
          <p className={styles.noOrders}>No new orders</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className={styles.order}>
              <h3>Order ID: {order._id}</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    <p className={styles.orderName}>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </li>
                ))}
              </ul>
              <p className={styles.amount}>Total Amount: ₹{order.totalAmount}</p>
              <button className={styles.doneBtn} onClick={() => handleDeleteOrder(order._id)}>Done</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
