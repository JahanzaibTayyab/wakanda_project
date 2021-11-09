import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../store";
import theme from "../assets/styles/theme";
import AppRouting from "../views/routing/AppRouting";
import AuthContextProvider from "../contexts/AuthContext";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AuthContextProvider>
          <AppRouting />
        </AuthContextProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
