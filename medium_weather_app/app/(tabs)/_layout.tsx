import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import CurrentlyScreen from ".";
import TodayScreen from "./today";
import WeeklyScreen from "./weekly";
import * as Location from "expo-location";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [routes] = useState<
    {
      key: string;
      title: string;
      icon: ComponentProps<typeof MaterialIcons | typeof FontAwesome5>["name"];
    }[]
  >([
    {
      key: "index",
      title: "Currently",
      icon: "wb-sunny",
    },
    {
      key: "today",
      title: "Today",
      icon: "calendar-day",
    },
    { key: "weekly", title: "Weekly", icon: "view-week" },
  ]);

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "index":
        return <CurrentlyScreen location={location} errorMsg={errorMsg} />;
      case "today":
        return <TodayScreen location={location} errorMsg={errorMsg} />;
      case "weekly":
        return <WeeklyScreen location={location} errorMsg={errorMsg} />;
      default:
        return null;
    }
  };

  const displayLocation = (search: string) => {
    setLocation(search);
    setSearch("");
  };

  async function getCurrentLocation() {
    setLocation("Waiting...");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        displayLocation(
          location.coords.latitude.toString() +
            " " +
            location.coords.longitude.toString(),
        );
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={colorScheme === "dark" ? "white" : "black"}
      inactiveColor="grey"
      indicatorStyle={{
        backgroundColor: colorScheme === "dark" ? "white" : "black",
      }}
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        height: 60,
      }}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "black" : "white",
      }}
      edges={["top"]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F0F0F0",
            },
          ]}
        >
          <TextInput
            style={[
              styles.searchInput,
              { color: colorScheme === "dark" ? "white" : "black" },
            ]}
            placeholder="Search city..."
            placeholderTextColor="grey"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            onPress={() => {
              displayLocation(search);
            }}
            style={styles.searchButton}
          >
            <Ionicons
              name="search"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.headerRight,
            {
              backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F0F0F0",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              getCurrentLocation();
            }}
            style={styles.headerButton}
          >
            <Entypo name="location-pin" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        commonOptions={{
          icon: ({ route, color }) => {
            const iconName = route?.icon;
            if (iconName === "wb-sunny" || iconName === "view-week") {
              return <MaterialIcons name={iconName} color={color} />;
            }
            if (iconName === "calendar-day") {
              return <FontAwesome5 name={iconName} color={color} />;
            }
            return null;
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 12,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    color: "#00000060",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    width: 48,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    width: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerButton: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
});
