import { MantineProvider } from '@mantine/core';
import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from "../store";
import NavBar from '../components/NavBar';
import { NotificationsProvider } from '@mantine/notifications';
import AppLayout from '../components/AppLayout';

function MyApp({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <NotificationsProvider>
          {/* <NavBar /> */}
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp
