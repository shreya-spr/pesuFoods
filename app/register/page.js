"use client"
import Link from "next/link";
import styles from "../../styles/home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            setError("All fields are necessary")
            return;
        }

        try {
            // const resUserExists = await fetch("api/userExists", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ email }),
            // });
      
            // const { user } = await resUserExists.json();
      
            // if (user) {
            //   setError("User already exists.");
            //   return;
            // }
      
            const res = await fetch("api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            });
      
            if (res.ok) {
              const form = e.target;
              form.reset();
              router.push("/");
            } else {
              console.log("User registration failed.");
            }
          } catch (error) {
            console.log("Error during registration: ", error);
          }
    }

    return (
        <>
        <div className={styles.loginContainer}>
      <div className={styles.loginFormContainer}>
        <h1 className={styles.formHeader}>Register</h1>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className={styles.loginBtn}>
            Register
          </button>

          {error && (
            <div className={styles.errorMsg}>
            {error}
          </div>
          )}
            
          

          <Link className={styles.registerRedirect} href={"/"}>
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
    </div>
        </>
    )
}

export default Register;