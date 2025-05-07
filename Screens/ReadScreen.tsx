import React, { useState } from "react";
import { View, StyleSheet, Alert, TextInput } from "react-native";
import readNfc from "../LogicComponents/ReadNFC";
import readDataFromBase from "../LogicComponents/ReadDataBase";
import TagDataType from "../Inteface/TagData";
import DataType from "../Inteface/DataType";
import TextConteinert from "../Components/TextConteiner";
import Button from "../Components/Button";
import PasswordButton from "../Components/PasswordButton";
import { GlobalStyles } from "../Components/GlobalStyles";
import InputTittles from "../Components/InputTittles";
import LinearGradient from "react-native-linear-gradient";

function ReadScreen() {
  const [tagData, setTagData] = useState<TagDataType | null>(null);
  const [dataFromBase, setDataFromBase] = useState<DataType | null>(null);
  const [password, setPassword] = useState("");
  const [showData, setShowData] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("*****");

  // Funkcja do odczytu NFC
  const handleNfcRead = async () => {
    try {
      const data = await readNfc();
      setTagData(data);

      if (data && data.id) {
        const dataFromBase = await readDataFromBase(data.id);
        setDataFromBase(dataFromBase);
        setShowData(!dataFromBase?.password_required);
      }
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się odczytać NFC.");
    }
  };

  // Funkcja do odszyfrowania danych (sprawdzenie hasła)
  const handleShowData = () => {
    if (!dataFromBase) {
      Alert.alert("Błąd", "Tego ID nie ma w bazie danych.");
      return;
    }

    if (dataFromBase.password_required) {
      if (password === dataFromBase.password) {
        setShowData(true);
      } else {
        Alert.alert("Błąd", "Nieprawidłowe hasło.");
      }
    } else {
      setShowData(true);
    }
  };

  return (
    <LinearGradient colors={["#585858", "#919696"]} style={styles.container}>
      <View style={styles.dataContainer}>
        {showData ? (
          <>
            <InputTittles text="ID Taga: " />
            <TextConteinert data={tagData?.id || placeHolder} />

            <InputTittles text="Nazwa: " />
            <TextConteinert data={dataFromBase?.name || placeHolder} />

            <InputTittles text="Szyfrowanie: " />
            <TextConteinert
              data={dataFromBase?.password_required ? "TAK" : "NIE"}
            />

            <InputTittles text="Wartość: " />
            <TextConteinert data={dataFromBase?.goods_value_summary_pln || placeHolder} />
          </>
        ) : (
          <>
            <InputTittles text="ID Taga: " />
            <TextConteinert data={placeHolder} />
            <InputTittles text="Nazwa: " />
            <TextConteinert data={placeHolder} />
            <InputTittles text="Szyfrowanie: " />
            <TextConteinert data={placeHolder} />
            <InputTittles text="Wartość: " />
            <TextConteinert data={placeHolder} />
          </>
        )}

        {dataFromBase?.password_required && !showData && (
          <>
            <InputTittles text="Podaj hasło:" />
            <TextInput
              style={styles.passwordInput}
              placeholder="Hasło"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
            <PasswordButton buttonText="Odszyfruj" onPress={handleShowData} />
          </>
        )}
      </View>

      <View>
        <Button IconName="nfc-search-variant" onPress={handleNfcRead} />
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
  passwordInput: {
    backgroundColor: GlobalStyles.colors.textBackground,
    borderColor: GlobalStyles.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: "3%",
    width: "90%",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ReadScreen;