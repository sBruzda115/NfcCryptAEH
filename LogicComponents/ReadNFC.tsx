import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import TagDataType from "../Inteface/TagData";
import { Alert } from "react-native";

async function readNfc() {
  let yourData: TagDataType | null = null;

  try {
    NfcManager.start()
      .then(() => {
        console.log("NFC initialized");
      })
      .catch((error) => {
        Alert.alert("ERROR", "NFC initialization erro", [
          { text: "OK", onPress: () => {} },
        ]);
      });

    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    console.log("Tag found");
    if (tag && tag.ndefMessage) {
      const ndefRecords = tag.ndefMessage;
      const firstRecord = ndefRecords[0];

      if (firstRecord) {
        const payload = new Uint8Array(firstRecord.payload);
        console.log("Pełen Payload:");

        const textData = Ndef.text.decodePayload(payload);
        const jsonData = JSON.parse(textData);

        console.log("Dane z tagu NFC:", jsonData);

        yourData = {
          id: jsonData.id,
        };
      }
    }
  } catch (ex) {
    console.log("ERROR!", ex);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }

  return yourData;
}

export default readNfc;
