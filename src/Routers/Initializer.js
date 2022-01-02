import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Pages/Home/Index";
import QuizScreen from "../Pages/Quiz/QuizScreen";
import QuestionScreen from "../Pages/Quiz/QuestionScreen";
import ThanksScreen from "../Pages/Quiz/ThanksScreen";

import colors from "../Constants/color";

const Stack = createStackNavigator();

/**
 * contains all routes of the application
 *
 * @returns {NavigatorContainer} jsx
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function Initializer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{
            title: "Let's Play",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              color: colors.grey1,
            },
          }}
        />

        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ThanksScreen"
          component={ThanksScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
