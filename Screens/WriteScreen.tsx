import React, { useState } from "react";
import { View, StyleSheet, Switch, Alert } from "react-native";
import Input from "../Components/Input";
import addStoreroom from "../LogicComponents/AddTagToDataBase";
import DataType from "../Inteface/DataType";
import Button from "../Components/Button";
import InputTittles from "../Components/InputTittles";
import { GlobalStyles } from "../Components/GlobalStyles";
import InputPasswordWrite from "../Components/InputPasswordWrite.tsx";
import LinearGradient from "react-native-linear-gradient";

function WriteScreen() {
  const [id, setid] = useState(0);
  const [name, setName] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [crypted, setCrypted] = useState(false);
  const [password, setPassword] = useState("");
  const toggleSwitch = () => setCrypted((previousState) => !previousState);

  const writeData = async () => {
    if (crypted === true && password === "") {
      Alert.alert("Worning", "Hasło jest puste", [
        { text: "OK", onPress: () => {} },
      ]);
      return;
    }
    const jsonData: DataType = {
      id: id,
      goods_value_summary_pln: summaryValue,
      name: name,
      password: password,
      password_required: crypted ? true : false,
    };

    await addStoreroom(jsonData);
  };

  return (
    <LinearGradient colors={["#585858", "#919696"]} style={styles.container}>
      <View style={styles.dataContainer}>
        <InputTittles text="Nazwa:" />
        <Input
          placeholder={"Hala X"}
          value={name}
          onChangeText={setName}
        ></Input>
        <InputTittles text="Wartość :" />
        <Input
          placeholder={"100,00 PLN"}
          value={summaryValue}
          onChangeText={setSummaryValue}
        ></Input>
        <View style={styles.switch}>
          <InputTittles text="Szyfrowanie:" />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={crypted ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={crypted}
            style={{ marginHorizontal: "5%" }}
          />
        </View>
        {crypted && (
          <>
            <InputTittles text="Hasło:" />
            <InputPasswordWrite
              placeholder={"*****"}
              value={password}
              onChangeText={setPassword}
            />
          </>
        )}
      </View>
      <View style={styles.buttonConteiner}>
        <Button IconName="nfc-variant" onPress={writeData} />
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
  title: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    padding: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.border,
    borderWidth: 3,
    borderRadius: 8,
    marginBottom: "2%",
    marginTop: "10%",
    width: "98%",
    backgroundColor: GlobalStyles.colors.gradient2,
  },
  buttonConteiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputTitles: {
    color: GlobalStyles.colors.text,
    paddingHorizontal: "20%",
    fontSize: 14,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "3%",
  },
});

export default WriteScreen;
