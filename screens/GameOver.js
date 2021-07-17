import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";

const GameOver = (props) => {
  return (
    <ScrollView>
      <View style={styles.gameover}>
        <Text style={{ fontFamily: "open-sans-bold", marginBottom: 10 }}>
          The Game is Over !
        </Text>
        <View style={styles.containerImage}>
          <Image
            source={require("../assets/img/success.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={{ fontFamily: "open-sans", marginBottom: 10 }}>
          Number of rounds : {props.roundsNumber}
        </Text>
        <Text style={{ fontFamily: "open-sans", marginBottom: 10 }}>
          Number was : {props.userNumber}
        </Text>
        <Button
          title="New Game"
          onPress={props.onRestart}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  gameover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  containerImage: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderColor: "#fff8dc",
    borderWidth: 5,
    overflow: "hidden",
    marginBottom: Dimensions.get("window").height / 30,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
