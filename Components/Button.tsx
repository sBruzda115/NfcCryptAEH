import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "./GlobalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface ButtonProps {
  IconName: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({ IconName, onPress }) => {
  const isDeleteButton = IconName === "delete";

  return (
    <View
      style={[
        styles.outerButtonConteiner,
        isDeleteButton && styles.deleteButtonContainer,
      ]}
    >
      <Pressable
        style={[
          styles.innerButtonConteiner,
          isDeleteButton && styles.deleteInnerButtonContainer,
        ]}
        android_ripple={{ color: GlobalStyles.colors.pressedButton }}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name={IconName}
          size={40}
          color={GlobalStyles.colors.titleText}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerButtonConteiner: {
    marginBottom: "3%",
    overflow: "hidden",
    borderRadius: 8,
  },
  innerButtonConteiner: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.border,
    backgroundColor: GlobalStyles.colors.bacgroundButton,
    borderWidth: 3,
    borderRadius: 8,
  },
  deleteButtonContainer: {
    borderColor: "red",
  },
  deleteInnerButtonContainer: {
    backgroundColor: "red",
  },
});
export default Button;
