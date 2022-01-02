import Initializer from "./src/Routers/Initializer";
import { useFonts } from "expo-font";

/**
 * Entry point of the application
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function App() {
  const [loaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Initializer />;
}
