import styles from '../../styles/admin.module.css';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import PESUimg from '../../public/images/title.png';

export default async function LoginForm() {
  const session = await getServerSession(options);

  return (
    <>
      <div className={styles.pesuLogoContainer}>
        <Image src={PESUimg} alt="PES University" />
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <h2>Welcome Vendor!</h2>
          <p className={styles.greetingSection}>Check your orders here 🚀</p>

          <div className={styles.dashboardBtn}>
            <Link href="/dashboard">Go to dashboard ➡️</Link>
          </div>

          {session ? (
            <div className={styles.signOutBtn}>
              <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
            </div>
          ) : (
            <div className={styles.signOutBtn}>
              <Link href="/auth/signin">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
