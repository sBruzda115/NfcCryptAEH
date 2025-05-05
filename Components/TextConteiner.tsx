import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

interface TextConteinertProps {
  data?: string | number | boolean;
}

const TextConteinert: FC<TextConteinertProps> = ({ data }) => {
  if (data !== undefined) {
    return (
      <View style={styles.textConteiner}>
        <Text style={styles.text}>{`${data}`}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.textConteiner}>
        <Text style={styles.text}></Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textConteiner: {
    backgroundColor: GlobalStyles.colors.textBackground,
    borderColor: GlobalStyles.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 13,
    padding: 10,
    marginVertical: "1%",
    marginHorizontal: 4,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: GlobalStyles.colors.text,
    //paddingHorizontal: "5%",
    fontSize: 17,
  },
});

export default TextConteinert;
