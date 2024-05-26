import styles from "../../styles/admin.module.css";
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { UserCard } from "../components/UserCard.js"
import Link from "next/link";
import Image from "next/image";
import PESUimg from "../../public/images/title.png"

export default async function LoginForm() {
  const session = await getServerSession(options)

  return (
    <>
      {/* {session ? (
          <UserCard user={session?.user} pagetype={"Admin"} />
        ) : (
      <h1 className={styles.formHeader}>not logged in Page!</h1>
      )} */}

      <div className={styles.pesuLogoContainer}>
          <Image
            src={PESUimg}
            alt={"PES University" }
          />
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <h2>Welcome ADMIN! </h2>
          <p className={styles.greetingSection}>
            Check your orders here 🚀
          </p>
          
          <div className={styles.dashboardBtn}>
            <Link href="/dashboard">Go to dashboard ➡️</Link>
          </div>

          <div className={styles.signOutBtn}>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        </div> 
      </div>

      
    </>
  )
}