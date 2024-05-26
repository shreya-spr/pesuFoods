"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PESUimg from "public/images/Pg3_logo.png";
import styles from "../../styles/cart.module.css"

const Cart = () => {
  return (
    <div className={styles.container}>
      <Image className={styles.pesuLogoImg} src={PESUimg} alt="PES University" />
      
    </div>
  )
}

export default Cart
