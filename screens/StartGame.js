import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Number from "../components/Number";
import Colors from "../constants/Colors";

const StartGame = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const InputHundler = (inputText) => {
    setInputValue(inputText.replace(/[^0-9]/g, ""));
  };

  const ResetInput = () => {
    setInputValue("");
    setConfirmed(false);
  };

  const ConfirmedInput = () => {
    const chooseNumber = parseInt(inputValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert(
        "Invalid Numbre !",
        "Number has to be a number between 0 and 99",
        [{ text: "Okay", style: "destructive", onPress: ResetInput }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chooseNumber);
    setInputValue("");
    Keyboard.dismiss();
  };

  let confirmedOutPut;
  if (confirmed) {
    confirmedOutPut = (
      <Card style={styles.cardSelected}>
        <Text style={{ fontFamily: "open-sans", fontSize: 18 }}>
          You Selected
        </Text>
        <Number> {selectedNumber} </Number>
        <Button
          title="Start Game"
          color={Colors.primary}
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="30">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start The Game</Text>
            <Card style={styles.viewInput}>
              <Text style={{ fontFamily: "open-sans", fontSize: 18 }}>
                Choose a number !
              </Text>
              <Input
                onChangeText={InputHundler}
                value={inputValue}
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
              />
              <View style={styles.viewButton}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    onPress={ResetInput}
                    color={Colors.secondary}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="confirm"
                    onPress={ConfirmedInput}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutPut}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  viewInput: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  viewButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    //width: 90,
    width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  cardSelected: {
    marginTop: 30,
    alignItems: "center",
  },
});
