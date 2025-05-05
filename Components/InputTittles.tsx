import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

interface InputTittlesProps {
  text: string;
}

const InputTittles: FC<InputTittlesProps> = ({ text }) => {
  return (
    <View style={styles.textConteiner}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textConteiner: {
    alignContent: "center",
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: 25,
  },
});

export default InputTittles;
