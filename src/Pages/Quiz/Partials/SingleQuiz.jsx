import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../../../Constants/color";

/**
 * Display Single quiz info
 *
 * @param {Object} data
 * @param {Navigator} navigation
 *
 * @returns {mix} view
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export const SingleQuiz = ({ data, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("QuestionScreen", {
          id: data.id,
          title: data.title,
        })
      }
    >
      <LinearGradient
        colors={[colors.blue1, colors.blue2, colors.blue3]}
        style={styles.cardWrapper}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{data.title}</Text>
          <SimpleLineIcons name="control-play" size={25} color="white" />
        </View>

        <Text style={styles.displayTime}>{data.displayTime}</Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 15,
    borderRadius: 15,
    padding: 18,
    elevation: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
  },
  displayTime: {
    //  alignSelf: "flex-end",
    color: "white",
    fontFamily: "MontserratRegular",
    marginTop: 10,
  },
});
