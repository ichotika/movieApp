import { ScrollView, Image, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { fetchSingle } from "../services/api";

const SingleMoviePage = ({ navigation, id, title, movies, route }) => {
  const [paramId, setParamId] = useState(route.params.id);
  const [paramMediaType, setParamMediaType] = useState(
    route.params.typeOf === "movies" ? "movie" : "tv"
  );
  const [singleShow, setSingleShow] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const results = await fetchSingle(paramMediaType, paramId);
        setSingleShow(results);

        navigation.setOptions({
          title: results.title,
        });
      } catch (error) {
        console.error("Error fetching single show:", error);
      }
    };

    fetchData();
  }, [paramId, paramMediaType]);

  console.log(singleShow)

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.contain}>
        <Text h1 style={styles.h1}>
          { singleShow.name || singleShow.title }
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${singleShow.poster_path}`,
          }}
        />
        <View style={styles.textContain}>
          <Text style={styles.paragraph}>{singleShow.overview}</Text>
          <Text style={styles.paragraph}>
            Popularity: {singleShow.popularity} | Release Date:{" "}
            {singleShow.release_date || singleShow.first_air_date}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {},
  contain: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
  },
  
  textContain: {
    display: "flex",
    justifyContent: "start",
  },
  paragraph: {
    color: "#181818",
    fontSize: 15,
    fontWeight: "normal",
    margin: 20,
  },
  image: {
    width: 300, 
    height: 300,
  },
  h1: {
    fontWeight: "bold",
    margin: 20,
    fontSize: 10,
    color: "#484848",
    textAlign: "center"
  },
});


export default SingleMoviePage;

