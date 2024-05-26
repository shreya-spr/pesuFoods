'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import PESUimg from '../../public/images/title.png';
import styles from '../../styles/admin.module.css';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in</div>;
  }

  return (
    <div className={styles.parentContainer}>
      <div className={styles.pesuLogoContainer}>
        <Image src={PESUimg} alt="PES University" />
      </div>

      <div className={styles.signOutBtn}>
          <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
      </div>

      <div className={styles.dashHeader}>
        <h2>Your Orders</h2>
      </div>

      <div className={styles.ordersContainer}>
        {orders.length === 0 ? (
          <p>No new orders</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className={styles.order}>
              <h3>Order ID: {order._id}</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </li>
                ))}
              </ul>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <button className={styles.doneBtn} onClick={() => handleDeleteOrder(order._id)}>Done</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
