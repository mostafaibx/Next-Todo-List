import ListsProvider from "@/Store/ListsProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ListsProvider>
      <Component {...pageProps} />
    </ListsProvider>
  );
}
