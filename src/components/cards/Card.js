import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { useState } from "react";
import { Button } from "react-native-elements";

const Card = ({ data, navigation, type }) => {
  const [movies, setMovies] = useState(data);
  const [typeOf, setTypeOf] = useState(type);

  const handleToSinglePage = (
    id,
    typeOf,
    mediaType,
    title,
    overview,
    posterPath,
    releaseDate,
    popularity,
    
  ) => {
    navigation.navigate("Single Movie", {
      id,
      typeOf,
      mediaType,
      title,
      overview,
      posterPath,
      releaseDate,
      popularity,
     
    });
  };

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <View style={styles.contain}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
          <View style={styles.textContain}>
            <Text style={styles.title}>
              {typeOf === "movies" ? item.title : item.name}
            </Text>
            <Text >Popularity: {item.popularity}</Text>
            <Text >
              Release Date: {typeOf === "movies" ? item.release_date : item.first_air_date}
            </Text>
            <Button
              title="More Details"
              buttonStyle={styles.button}
              onPress={() =>
                handleToSinglePage(
                  item.id,
                  typeOf,
                  item.media_type,
                  item.title || item.name,
                  item.overview,
                  item.poster_path,
                  item.release_date || item.first_air_date,
                  item.popularity,
                )
              }
            />
          </View>
        </View>
      )}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    gap: 10,
    padding: 10,
  },
  image: {
    width: "30%",
    aspectRatio: 1,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#30839f",
  },
  textContain: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontWeight: "bold",
  },
});
