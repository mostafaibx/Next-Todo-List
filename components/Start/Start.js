import Link from "next/link";
import classes from "./Start.module.css";

function Start() {
  return (
    <div className={classes.start}>
      <h1>Welcome to TODOS</h1>
      <h3>Next To do lists app</h3>
      <Link href="/create-first-list">
        <button>Let's Go</button>
      </Link>
    </div>
  );
}

export default Start;
