import ListsContext from "@/Store/ListsContext";
import AddTask from "@/components/AddTask/AddTask";
import BarLoader from "react-spinners/BarLoader";
import Head from "next/head";
import { useContext, useState } from "react";

export default function AddTaskPage() {
  const [isLoading, setIsLoading] = useState(false);
  const listCtx = useContext(ListsContext);

  async function createTaskHandler(task) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!response.ok) {
        listCtx.getError(data.message);
      } else {
        listCtx.getSuccess(data.message);
      }
    } catch (error) {
      listCtx.getError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="Todo list next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && (
        <div style={{ overflow: "hidden" }}>
          <BarLoader color={"#36D7B7"} loading={true} width={10000} />
        </div>
      )}
      <AddTask onAddTask={createTaskHandler} />
    </>
  );
}
