import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

interface PasswordButtonProps {
  buttonText: string;
  onPress: () => void;
}

const PasswordButton: FC<PasswordButtonProps> = ({ buttonText, onPress }) => {
  return (
    <View style={styles.outerButtonConteiner}>
      <Pressable
        style={styles.innerButtonConteiner}
        android_ripple={{ color: GlobalStyles.colors.pressedButton }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  outerButtonConteiner: {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.bacgroundButton,
  },
  innerButtonConteiner: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.border,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: GlobalStyles.colors.border,
    borderColor: GlobalStyles.colors.border,
  },
});

export default PasswordButton;
