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
 * Display Thankyou screen
 *
 * @param {Navigator} navigation
 * @param {Route} route
 *
 * @returns {mix} view
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function ThanksScreen({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.purple3, colors.purple2, colors.purple1]}
        style={{ flex: 1 }}
      >
        <View style={styles.centerView}>
          <Text style={styles.textCenter}>
            Your Score {route.params.answerCounter}/{route.params.total}
          </Text>
          <Image
            source={require("../../../assets/homeIcon.png")}
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.textCenter}>Thank You</Text>
          <Text style={styles.textCenterSub}>Great! Mission Completed</Text>
        </View>
        <TouchableOpacity
          style={styles.letStartText}
          onPress={() => navigation.navigate("QuizScreen")}
        >
          <Text style={styles.bottomText}>Let's Play again</Text>
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
  textCenterSub: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "MontserratBold",
    fontSize: 20,
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
