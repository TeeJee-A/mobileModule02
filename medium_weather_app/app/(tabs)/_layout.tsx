import CustomTabBar from "@/components/CustomTabBar";
import LocationButton from "@/components/LocationButton";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocation } from "@/hooks/use-location";
import { useSearch } from "@/hooks/use-search";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps, useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import CurrentlyScreen from ".";
import SelectedLocation from "../../types/selected-location";
import TodayScreen from "./today";
import WeeklyScreen from "./weekly";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [currentlyLocation, setCurrentlyLocation] =
    useState<SelectedLocation | null>(null);
  const [todayLocation, setTodayLocation] = useState<SelectedLocation | null>(
    null,
  );
  const [weeklyLocation, setWeeklyLocation] = useState<SelectedLocation | null>(
    null,
  );
  const { getCurrentLocation, firstLocation } = useLocation();
  const { search, countries, loading, error, handleChangeText, setSearch } =
    useSearch();

  const [routes] = useState<
    {
      key: string;
      title: string;
      icon: ComponentProps<typeof MaterialIcons | typeof FontAwesome5>["name"];
    }[]
  >([
    {
      key: "currently",
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

  const colorMode = colorScheme === "dark" ? "dark" : "light";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  const handleClick = () => {
    handleSelectCountry({
      latitude: "",
      longitude: "",
      name: search,
      country: "",
      admin1: "",
      id: 0,
    });
  };

  const handleSelectCountry = (location: SelectedLocation) => {
    setSearch("");
    switch (index) {
      case 0:
        setCurrentlyLocation(location);
        break;
      case 1:
        setTodayLocation(location);
        break;
      case 2:
        setWeeklyLocation(location);
        break;
    }
  };

  const handleClickLocation = () => {
    switch (index) {
      case 0:
        setCurrentlyLocation(null);
        break;
      case 1:
        setTodayLocation(null);
        break;
      case 2:
        setWeeklyLocation(null);
        break;
    }
    getCurrentLocation();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "currently":
        return (
          <CurrentlyScreen
            selectedLocation={currentlyLocation}
            geoLocation={firstLocation}
          />
        );
      case "today":
        return (
          <TodayScreen
            selectedLocation={todayLocation}
            geoLocation={firstLocation}
          />
        );
      case "weekly":
        return (
          <WeeklyScreen
            selectedLocation={weeklyLocation}
            geoLocation={firstLocation}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <CustomTabBar colorScheme={colorMode} props={props} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <SearchBar
          search={search}
          colorScheme={colorMode}
          onChangeText={handleChangeText}
          onSearch={handleClick}
        />
        <LocationButton colorScheme={colorMode} onPress={handleClickLocation} />
        {search.length > 0 && (
          <SearchResults
            countries={countries}
            loading={loading}
            error={error}
            colorScheme={colorMode}
            onSelectCountry={handleSelectCountry}
          />
        )}
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
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    position: "relative",
  },
  locationText: {
    textAlign: "center",
    paddingVertical: 8,
  },
});
