import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import { store } from "../app/store";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
