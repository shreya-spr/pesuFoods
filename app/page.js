"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PESUimg from "../public/images/title.png"
import food from "../public//images/food.png";
import styles from "../styles/home.module.css";


const Home = () => {

  return (
    <div className={styles.mainContainer}>
        <div className={styles.pesuLogoContainer}>
            <Image
                src={PESUimg}
                alt={"PES University" }
            />
        </div>

      <div className={styles.headerContainer}>
        <div id={styles.header}>
          <h1>PESU Foods</h1>

          {/* login form */}
          <div className={styles.loginRedirect}>
            <Link href={"/login"}>
              Login
            </Link>
          </div>

          <button id={styles.orderBtn}>
           <Link href={"/canteen"}> Order Now </Link> 
          </button>
         
        </div>
        <div className={styles.FoodImgContainer}>
        <Image
            src={food}
            alt={"food Image" }
        />
        </div>
      </div>
    </div>
  )
}

export default Home
