import styles from "../../styles/admin.module.css";

function UserCard({ user, pagetype }) {
  //console.log(user);

  const greeting = user?.name ? (
    <div className={styles.greetingMsg}>
      Hello {user?.name}!
    </div>
  ) : null;

  return (
    <section className={styles.greetingSection}>
      {greeting}
      <p className="text-2xl text-center">{pagetype} Page!</p>
    </section>
  );
}

export default UserCard;
