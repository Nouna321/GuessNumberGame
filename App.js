import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Headers";
import Game from "./screens/Game";
import StartGame from "./screens/StartGame";
import GameOver from "./screens/GameOver";

const fetchFont = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoader, setDataLoader] = useState(false);

  fetchFont();

  if (!dataLoader) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoader(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverRounds = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGame onStartGame={startGame} />;

  if (userNumber && guessRounds <= 0) {
    content = <Game choiceUser={userNumber} onGameOver={gameOverRounds} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
