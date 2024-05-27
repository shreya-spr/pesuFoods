"use client"

import React from 'react'
import { useRouter } from "next/navigation"

import Image from 'next/image'
// import title from "public/images/title.png"
import logo from "public/images/logo.png"
import i1 from "public/images/caf_1.png"
import i2 from "public/images/caf_2.png"
import i3 from "public/images/caf_3.png"
import i4 from "public/images/caf_4.png"
import styles from "../../styles/canteen.module.css"

const Canteen = () => {

  const router = useRouter();

  const handleImageClick = (path) => {
    router.push(path);
  }

  return (
    <> 
      {/* your logo*/}

      <div className={styles.main}>
        <div className={styles.logo}>
          <Image 
            src={logo} 
            alt="foods" 
          />
        </div>

        <p className={styles.intro}>Welcome to PESU Foods. Order your food now!</p>
        <div className={styles.imgs}>
          <div className={styles.bor} onClick={() => handleImageClick('/cant1')}>
            <Image 
              id={styles.imgBut} 
              src={i1} 
              alt="caf" 
              />
          </div>
          <div className={styles.bor} onClick={() => handleImageClick('/path2')}>
            <Image 
              id={styles.imgBut} 
              src={i2} 
              alt="caf" 
              />
          </div>
          <div className={styles.bor} onClick={() => handleImageClick('/path3')}>
            <Image 
              id={styles.imgBut} 
              src={i3} 
              alt="caf" 
              />
          </div>
          <div className={styles.bor} onClick={() => handleImageClick('/path4')}>
            <Image 
              id={styles.imgBut} 
              src={i4} 
              alt="caf" 
              />
          </div>
        </div>
      </div>
    </>
  )
}

export default Canteen
