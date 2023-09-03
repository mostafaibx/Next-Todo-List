import classes from "./SideBar.module.css";
import ListCard from "./ListCard/ListCard";
import ListsContext from "@/Store/ListsContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

function SideBar() {
  const router = useRouter();
  const listCtx = useContext(ListsContext);
  const [lists, setLists] = useState(listCtx.lists);

  function createListHandler() {
    router.push("/create-list");
  }

  function reRender(id) {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  }

  useEffect(() => {
    setLists(listCtx.lists);
  }, [listCtx.lists]);

  return (
    <div className={classes.SideBar}>
      <div className={classes.head}>
        <h1>Todos</h1>
        <button onClick={createListHandler}>+</button>
      </div>
      {lists.map((list) => (
        <ListCard
          key={list.id}
          id={list.id}
          title={list.title}
          color={list.color}
          onDelete={reRender}
        />
      ))}
    </div>
  );
}

export default SideBar;
