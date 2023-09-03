import classes from "./AddTask.module.css";
import ListsContext from "@/Store/ListsContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

function AddTask(props) {
  const router = useRouter();
  const listCtx = useContext(ListsContext);
  const [error] = useState(listCtx.isError);

  function addNewTaskHandler(event) {
    event.preventDefault();
    const task = {
      title: event.target.title.value,
      date: event.target.date.value,
      time: event.target.time.value,
      note: event.target.note.value,
      listId: listCtx.SelectedlistId,
      id: Math.random().toString(),
    };

    props.onAddTask(task);

    if (!error) {
      router.push("./main-page");
    }
  }

  return (
    <div className={classes.card}>
      <p className={classes.error}>{listCtx.error}</p>
      <h1>Add your new task.</h1>

      <form onSubmit={addNewTaskHandler}>
        <label>Title:</label>
        <input type="text" name="title" required />

        <label>Date:</label>
        <input type="date" name="date" required />

        <label>Time:</label>
        <input type="time" name="time" />

        <label>Notes:</label>
        <input type="text" name="note" />
        <button>Create...</button>
      </form>
    </div>
  );
}

export default AddTask;
