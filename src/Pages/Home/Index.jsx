import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../Constants/color";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Display Home screen
 *
 * @param {Navigator} navigation
 *
 * @returns {mix} view
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.blue3, colors.blueH1, colors.blueH2]}
        style={{ flex: 1 }}
      >
        <View style={styles.centerView}>
          <Image
            source={require("../../../assets/homeIcon.png")}
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.textCenter}>Quiz App</Text>
        </View>
        <TouchableOpacity
          style={styles.letStartText}
          onPress={() => navigation.navigate("QuizScreen")}
        >
          <Text style={styles.bottomText}>Let's Start</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    color: colors.blue2,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "MontserratBold",
    fontSize: 30,
    color: colors.white,
  },
  letStartText: {
    position: "absolute",
    bottom: 20,
    backgroundColor: colors.white,

    right: 20,
    margin: 15,
    padding: 15,
    borderRadius: 20,
    elevation: 10,
  },
});
