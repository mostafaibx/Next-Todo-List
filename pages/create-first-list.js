import classes from "../styles/firstList.module.css";
import Head from "next/head";
import CreateForm from "@/components/CreateList/CreateForm";
import ListsContext from "@/Store/ListsContext";
import { useContext, useState } from "react";
import { BarLoader } from "react-spinners";

export default function CreateFirstList() {
  const listCtx = useContext(ListsContext);
  const [isLoading, setIsLoading] = useState(false);

  async function createListHandler(listInput) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/lists", {
        method: "POST",
        body: JSON.stringify(listInput),
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
      <div className={classes.container}>
        <h1>Create Your First Form.</h1>
        <CreateForm onCreateList={createListHandler} />
      </div>
    </>
  );
}
