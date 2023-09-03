import classes from "./CreateForm.module.css";
import ListsContext from "@/Store/ListsContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

function CreateForm(props) {
  const listCtx = useContext(ListsContext);
  const router = useRouter();
  const [color, setColor] = useState("");

  function selectColorHandler(event) {
    setColor(event.target.id);
  }

  function createListHandler(event) {
    event.preventDefault();
    const list = {
      title: event.target.title.value,
      color: color || "0958bf",
    };
    props.onCreateList(list);

    if (!listCtx.isError) {
      router.push("/main-page");
    }
  }

  return (
    <div className={classes.createForm}>
      <p className={classes.error}>{listCtx.error}</p>
      <form onSubmit={createListHandler}>
        <label>Enter your list name</label>
        <input type="text" className={classes.name} name="title" required />
        <div className={classes["color-list"]}>
          <h5>Select your list color: </h5>
          <ul onClick={selectColorHandler}>
            <li
              className={`${classes.red} ${
                color === "bf0909" ? classes.selected : ""
              }`}
              id="bf0909"
            ></li>
            <li
              className={`${classes.green} ${
                color === "7cbf09" ? classes.selected : ""
              }`}
              id="7cbf09"
            ></li>
            <li
              className={`${classes.yellow} ${
                color === "bbc506" ? classes.selected : ""
              }`}
              id="bbc506"
            ></li>
            <li
              className={`${classes.purple} ${
                color === "bf094f" ? classes.selected : ""
              }`}
              id="bf094f"
            ></li>
            <li
              className={`${classes.blue} ${
                color === "0958bf" ? classes.selected : ""
              }`}
              id="0958bf"
            ></li>
          </ul>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}

export default CreateForm;
