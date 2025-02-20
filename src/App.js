/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
// import {NavigationContainer} from '@react-navigation/native';


export default function App() {
  return (
    // <NavigationContainer>

    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
    {/* </NavigationContainer> */}

  );
}
