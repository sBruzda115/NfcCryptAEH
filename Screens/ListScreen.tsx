import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GlobalStyles } from "../Components/GlobalStyles";

function ListScreen() {
  return (
    <LinearGradient colors={["#585858", "#919696"]} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lista Obiektów</Text>
        <Text style={styles.placeholderText}>
          Tutaj pojawi się lista zapisanych obiektów NFC.
        </Text>
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
  contentContainer: {
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.gradient2,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.border,
    borderRadius: 8,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.titleText,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: GlobalStyles.colors.text,
    textAlign: "center",
  },
});

export default ListScreen;