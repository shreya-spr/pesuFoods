"use client"
import React, { useEffect } from 'react';
import styles from '../../styles/success.module.css';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import title from "public/images/title.png";
import logo from "public/images/logo.png";
import Link from 'next/link';

const SuccessPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  return (
    <>
      <div className={styles.pesuLogoContainer}>
        <Image
          src={title}
          alt={"PES University"}
        />
      </div>
      
      <div className={styles.successContainer}>
        <h2>
          Congratulations!
        </h2>
        <span>Your order is received.</span>
        <div className={styles.homeBtn}>
          <Link href="/">Go to Home</Link>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
