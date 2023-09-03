import classes from "./ListCard.module.css";
import ListsContext from "@/Store/ListsContext";
import { useContext, useState } from "react";

function ListCard(props) {
  const [showTasks, setShowTasks] = useState(false);
  const listCtx = useContext(ListsContext);

  function showBtnHandler() {
    setShowTasks(!showTasks);
  }

  function showListHandler() {
    listCtx.getSelectedList(props.id);
    console.log(props.id);
  }

  async function deleteListHandler() {
    props.onDelete(props.id);
    const response = await fetch("/api/lists", {
      method: "DELETE",
      body: JSON.stringify(props.id),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div
      className={classes.ListCard}
      id={props.id}
      onClick={showListHandler}
      style={{ backgroundColor: `#${props.color}` }}
    >
      <div className={classes.head}>
        <h2>{props.title}</h2>
        <button className={classes.show} onClick={showBtnHandler}>
          {showTasks ? "-" : "+"}
        </button>
      </div>
      {showTasks && (
        <div className={classes.actions}>
          <button className={classes.delete} onClick={deleteListHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ListCard;
