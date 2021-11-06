import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../store";
import theme from "../assets/styles/theme";
import AppRouting from "../views/routing/AppRouting";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AppRouting />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
