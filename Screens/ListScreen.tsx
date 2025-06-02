import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalStyles } from "../Components/GlobalStyles";
import InputTittles from "../Components/InputTittles";
import CustomButton from "../Components/Button";

interface ListItemType {
  id: string;
  name: string;
}

interface FullDataType {
  goods_value_summary_pln: number | string;
  id: number;
  name: string;
  password: string;
  password_required: boolean;
}

function ListScreen() {
  const [data, setData] = useState<ListItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<FullDataType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDataFromDatabase = async () => {
    try {
      const snapshot = await firestore().collection("storerooms").get();
      const dataList: ListItemType[] = [];

      snapshot.forEach((doc) => {
        dataList.push({
          id: doc.id,
          name: doc.data().name,
        });
      });

      setData(dataList);
    } catch (error) {
      console.error("Błąd podczas pobierania danych z bazy danych", error);
    }
  };

  const openModal = async (item: ListItemType) => {
    try {
      const docRef = await firestore()
        .collection("storerooms")
        .doc(item.id)
        .get();
      const fullData: FullDataType = docRef.data() as FullDataType;
      setSelectedItem(fullData);
      setModalVisible(true);
    } catch (error) {
      console.error(
        "Błąd podczas pobierania pełnych danych z bazy danych",
        error
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const deleteItem = async () => {
    try {
      if (selectedItem) {
        await firestore()
          .collection("storerooms")
          .doc(selectedItem.id.toString())
          .delete();
        closeModal();
        fetchDataFromDatabase();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania danych z bazy danych", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataFromDatabase();
    }, [])
  );

  return (
    <LinearGradient colors={["#585858", "#919696"]} style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>Nazwa: {item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {selectedItem && (
            <LinearGradient
              colors={["#fff", "#919696"]}
              style={styles.contentContainer}
            >
              <InputTittles text={`ID: ${selectedItem.id}`} />
              <InputTittles text={`Nazwa: ${selectedItem.name}`} />
              <InputTittles
                text={`Wartość: ${selectedItem.goods_value_summary_pln}`}
              />
              <InputTittles
                text={`Szyfrowanie : ${
                  selectedItem.password_required ? "Tak" : "Nie"
                }`}
              />

              <View style={styles.buttonsContainer}>
                <View style={styles.buttonBox}>
                  <CustomButton IconName="delete" onPress={deleteItem} />
                </View>
                <View style={styles.buttonBox}>
                  <CustomButton IconName="close" onPress={closeModal} />
                </View>
              </View>
            </LinearGradient>
          )}
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  listItemContainer: {
    backgroundColor: GlobalStyles.colors.textBackground,
    borderColor: GlobalStyles.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  listItemText: {
    color: GlobalStyles.colors.text,
    fontSize: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ListScreen;
