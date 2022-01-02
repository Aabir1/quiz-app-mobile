import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../../Constants/color";

const FooterLoader = ({ loading }) => {
  return (
    <View>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <ActivityIndicator size="small" color={colors.blue2} />
          <Text
            style={{ fontFamily: "MontserratRegular", color: colors.blue2 }}
          >
            {"   Please Wait ..."}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default FooterLoader;
