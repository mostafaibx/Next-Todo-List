import classes from "./ListItem.module.css";
import ListsContext from "@/Store/ListsContext";
import { useContext } from "react";

function ListItem(props) {
  const listCtx = useContext(ListsContext);

  async function deleteItemHandler(event) {
    event.preventDefault();
    props.onDelete(props.id);
    const identifiers = {
      listId: listCtx.SelectedlistId,
      itemId: props.id,
    };

    const response = await fetch("/api/items", {
      method: "DELETE",
      body: JSON.stringify(identifiers),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className={classes.task} onClick={props.showDetailsHandler}>
      <input type="checkbox"></input>
      <label> {props.title}</label>
      {props.showDetails && (
        <div className={classes.details}>
          <div className={classes.date}>
            <p>Date: {props.date}</p>
            {props.time && <p>Time: {props.time}</p>}
          </div>
          {props.note && <p>Notes: {props.note}</p>}
          <button onClick={deleteItemHandler}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ListItem;
