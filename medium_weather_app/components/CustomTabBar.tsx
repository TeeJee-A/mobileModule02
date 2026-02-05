import { TabBar } from "react-native-tab-view";

interface CustomTabBarProps {
  colorScheme: "light" | "dark";
  props: any;
}

export default function CustomTabBar({
  colorScheme,
  props,
}: CustomTabBarProps) {
  return (
    <TabBar
      {...props}
      activeColor="#f5c419"
      inactiveColor="grey"
      indicatorStyle={{
        backgroundColor: "#f5c419",
      }}
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        height: 60,
      }}
    />
  );
}
