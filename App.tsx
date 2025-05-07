import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReadScreen from "./Screens/ReadScreen";
import WriteScreen from "./Screens/WriteScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { GlobalStyles } from "./Components/GlobalStyles";
import ListScreen from "./Screens/ListScreen";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.bar },
          headerTintColor: GlobalStyles.colors.titleText,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: GlobalStyles.colors.titleText,
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.bar,
            justifyContent: "center",
          },
        }}
      >
        <Tab.Screen
          name="Read Tag NFC"
          component={ReadScreen}
          options={{
            title: "NFC Tag Reader",
            tabBarLabel: "Odczyt",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="nfc-search-variant"
                color={GlobalStyles.colors.titleText}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lista"
          component={ListScreen}
          options={{
            title: "Object List",
            tabBarLabel: "Lista",
            tabBarIcon: () => (
              <Entypo
                name="list"
                color={GlobalStyles.colors.titleText}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Write NFC Tag"
          component={WriteScreen}
          options={{
            title: "NFC Tag Writer",
            tabBarLabel: "Zapis",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="nfc-variant"
                size={25}
                color={GlobalStyles.colors.titleText}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
