import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import colors from "../../Constants/color";
export const PageLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.blue2} />
      <Text
        style={{
          fontFamily: "MontserratMedium",
          marginTop: 10,
          color: colors.blue1,
        }}
      >
        Loading
      </Text>
    </View>
  );
};
