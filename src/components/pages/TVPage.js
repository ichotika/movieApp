import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Card from "../cards/Card";
import Loader from "../layout/Loader";
import Dropdown from "../layout/Dropdown";
import { fetchTV } from "../services/api";

const TVPage = ({ navigation }) => {
const [tvShows, setTvShows] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [category, setCategory] = useState("popular");
const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const categories = [
    {
      type: "popular",
      onPress: () => setCategory("popular"),
      containerStyle: { padding: 5, paddingTop: 30 },
    },
    {
      type: "airing_today",
      onPress: () => setCategory("airing_today"),
      containerStyle: { padding: 5 },
    },
    {
      type: "on_the_air",
      onPress: () => setCategory("on_the_air"),
      containerStyle: { padding: 5 },
    },
    {
      type: "top_rated",
      onPress: () => setCategory("top_rated"),
      containerStyle: { padding: 5, paddingBottom: 30 },
    },
  ];

  useEffect(() => {
    const fetchTVShows = async () => {
      const results = await fetchTV(category);
      setTvShows(results);
      setIsLoading(false);
    };
    fetchTVShows();
    setIsLoading(true);
    setIsBottomSheetVisible(false);
  }, [category]);

  const handleDropdownPress = () => {
    setIsBottomSheetVisible(true);
  };

  const handleDropdownSelect = (selectedCategory) => {
    setCategory(selectedCategory.type);
    setIsBottomSheetVisible(false);
  };

  return (
    <View>
      <Dropdown
        title={category}
        categories={categories}
        onPress={handleDropdownPress}
        onSelect={handleDropdownSelect}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Card data={tvShows} type={"tvShows"} navigation={navigation} />
      )}
    </View>
  );
};

export default TVPage;