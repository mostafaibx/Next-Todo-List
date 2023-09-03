import classes from "../styles/MainPage.module.css";
import Head from "next/head";
import SideBar from "@/components/SideBar/SideBar";
import ListContent from "@/components/ListContent/ListContent";
import ListsContext from "@/Store/ListsContext";
import { useContext, useEffect, useState } from "react";
import { MongoClient } from "mongodb";

export default function MainPage(props) {
  const listCtx = useContext(ListsContext);

  useEffect(() => {
    listCtx.getLists(props.lists);
  }, [props.lists]);

  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="Todo list next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.container}>
        <SideBar lists={props.lists} />
        <ListContent lists={props.lists} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://imostafa:uIYmepEbhbeHEqz7@cluster0.ewriadj.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const listsCollection = db.collection("list");

  const lists = await listsCollection.find().toArray();
  return {
    props: {
      lists: lists.map((list) => ({
        id: list._id.toString(),
        title: list.title,
        color: list.color || null,
        items: list.items || null,
      })),
    },
  };
}
