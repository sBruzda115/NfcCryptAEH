import firestore from "@react-native-firebase/firestore";
import DataType from "../Inteface/DataType";

const readDataFromBase = async (tagId: number) => {
  try {
    const docRef = firestore().collection("storerooms").doc(tagId.toString());
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data() as DataType;
      return data;
    } else {
      console.log("Dokument o podanym ID nie istnieje w bazie danych.");
      return null;
    }
  } catch (error) {
    console.log("Błąd podczas pobierania danych z bazy danych", error);
    return null;
  }
};

export default readDataFromBase;
