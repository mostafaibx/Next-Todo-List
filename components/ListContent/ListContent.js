import classes from "./ListContent.module.css";
import ListsContext from "@/Store/ListsContext";
import ListItem from "./LIstItem";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

function ListContent() {
  const router = useRouter();
  const listCtx = useContext(ListsContext);

  const [items, setItems] = useState(listCtx.selectedList?.items || []);
  const initialShowDetails = items?.map(() => false) || [];
  const [showDetails, setShowDetails] = useState(initialShowDetails);

  function showDetailsHandler(i) {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[i] = !updatedShowDetails[i];
    setShowDetails(updatedShowDetails);
  }

  function createTaskHandler() {
    router.push("/add-new-task");
  }

  function reRender(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  }

  useEffect(() => {
    setItems(listCtx.selectedList?.items || []);
  }, [listCtx.selectedList?.items]);

  return (
    <div
      className={classes.card}
      style={{ backgroundColor: `#${listCtx.selectedList?.color}` }}
    >
      {!listCtx.selectedList && (
        <p className={classes.empty}>Select one of your lists</p>
      )}

      <h1>{listCtx.selectedList && listCtx.selectedList.title}</h1>

      <form>
        {listCtx.selectedList &&
          items.map((item, index) => (
            <ListItem
              key={item.id}
              id={item.id}
              showDetails={showDetails[index]}
              showDetailsHandler={() => showDetailsHandler(index)}
              title={item.title}
              date={item.date}
              time={item.time}
              note={item.note}
              onDelete={reRender}
            ></ListItem>
          ))}
      </form>
      {listCtx.selectedList && (
        <button className={classes.add} onClick={createTaskHandler}>
          +
        </button>
      )}
    </div>
  );
}

export default ListContent;
