import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.textHeader}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  textHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});
