import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GlobalStyles } from "../Components/GlobalStyles";
import InputTittles from "../Components/InputTittles";
import TextConteinert from "../Components/TextConteiner";
import Button from "../Components/Button";

function ReadScreen() {
  return (
    <LinearGradient colors={["#585858", "#919696"]} style={styles.container}>
      <View style={styles.dataContainer}>
        <InputTittles text="ID Taga: " />
        <TextConteinert data="-----" />
        <InputTittles text="Nazwa: " />
        <TextConteinert data="-----" />
        <InputTittles text="Szyfrowanie: " />
        <TextConteinert data="-----" />
        <InputTittles text="Wartość: " />
        <TextConteinert data="-----" />
      </View>
      <View>
        <Button IconName="nfc-search-variant" onPress={() => {}} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.gradient1,
  },
  dataContainer: {
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.border,
    backgroundColor: GlobalStyles.colors.gradient2,
    borderWidth: 3,
    borderRadius: 8,
    marginBottom: "2%",
    marginTop: "3%",
    width: "98%",
  },
});

export default ReadScreen;