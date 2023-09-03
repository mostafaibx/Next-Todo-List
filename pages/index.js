import Head from "next/head";
import Start from "@/components/Start/Start";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="Todo list next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Start />
    </>
  );
}
