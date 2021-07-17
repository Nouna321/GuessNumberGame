import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

const Number = (props) => {
  return (
    <View style={styles.viewNumber}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  viewNumber: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.secondary,
    fontSize: 22,
    fontFamily: "open-sans",
  },
});
