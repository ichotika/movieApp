import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import MoviesPage from "../pages/MoviesPage";
import SearchPage from "../pages/SearchPage";
import TVPage from "../pages/TVPage";

const CustomTab = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("now_playing"); 
  const [selectedTVOption, setSelectedTVOption] = useState("popular"); 

  return (
    <>
      <Tab
        value={index}
        onChange={(index) => setIndex(index)}
        indicatorStyle={{
          backgroundColor: "#2c3e50",
        }}
        style={styles.tab}
      >
        <Tab.Item
          title="Movies"
          titleStyle={{ color: "black", fontSize: 12.8}}
          containerStyle={styles.tabItem}
        />
        <Tab.Item
          title="Search results"
          titleStyle={{ color: "black", fontSize: 12.8}}
          containerStyle={styles.tabItem}
        />
        <Tab.Item
          title="TV shows"
          titleStyle={{ color: "black", fontSize: 12.8}}
          containerStyle={styles.tabItem}
        />
      </Tab>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={styles.tabView}>
          <MoviesPage navigation={navigation} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <SearchPage navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <TVPage navigation={navigation} selectedOption={selectedTVOption} setSelectedOption={setSelectedTVOption}/>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#2c3e50",
  },
  tabView: {
    backgroundColor: "white",
    width: "100%",
  },
  tabItem: {
    backgroundColor: "white",
    height: 50,
  },
});
