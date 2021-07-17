import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import Number from "../components/Number";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

import Colors from "../constants/Colors";

const generateRandom = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndm = Math.floor(Math.random() * (max - min)) + min;
  if (rndm === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return rndm;
  }
};

const renderList = (listLength, itemData) => (
  <View style={styles.listItems}>
    <Text style={{ fontFamily: "open-sens-bold" }}>
      #{listLength - itemData.index}
    </Text>
    <Text style={{ fontFamily: "open-sens-bold" }}>{itemData.item}</Text>
  </View>
);

const Game = (props) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandom(0, 100, props.choiceUser);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { choiceUser, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === choiceUser) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, choiceUser, onGameOver]);

  const nextGuessNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.choiceUser) ||
      (direction === "greater" && currentGuess > props.choiceUser)
    ) {
      Alert.alert("Don't lie !", "You know that this is wrong ...", [
        { text: "Sorry !", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandom(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text style={{ fontFamily: "open-sans-bold", fontSize: 18 }}>
        Opponent's Guess
      </Text>
      <Number>{currentGuess}</Number>
      <Card style={styles.cardButton}>
        <MainButton onPress={nextGuessNumber.bind(this, "lower")}>
          <Ionicons name="ios-remove" />
        </MainButton>
        <MainButton onPress={nextGuessNumber.bind(this, "greater")}>
          <Ionicons name="ios-add" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderList(guess, pastGuesses.length - index)
          )}
          </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderList.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  cardButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  list: {
    flex: 1,
    width: Dimensions.get("window").height > 350 ? "60%" : "80%",
  },

  listItems: {
    borderColor: "#fff8dc",
    borderWidth: 2,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
