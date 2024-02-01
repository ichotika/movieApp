import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Card from "../cards/Card";
import Loader from "../layout/Loader";
import { fetchMovies } from "../services/api";
import Dropdown from "../layout/Dropdown";

const MoviesPage = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("now_playing");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const categories = [
    {
      type: "now_playing",
      onPress: () => setCategory("now_playing"),
      containerStyle: { padding: 5, paddingTop: 30 },
    },
    {
      type: "popular",
      onPress: () => {
        setCategory("popular");
      },
      containerStyle: { padding: 5 },
    },
    {
      type: "top_rated",
      onPress: () => setCategory("top_rated"),
      containerStyle: { padding: 5 },
    },
    {
      type: "upcoming",
      onPress: () => setCategory("upcoming"),
      containerStyle: { padding: 5, paddingBottom: 30 },
    },
  ];

  useEffect(() => {
    const fetchMoviesData = async () => {
      const results = await fetchMovies(category);
      setMovies(results);
      setIsLoading(false);
    };
    fetchMoviesData();
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
        <Card data={movies} type={"movies"} navigation={navigation} />
      )}
    </View>
  );
};

export default MoviesPage;
