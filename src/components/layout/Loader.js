import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const Loader = () => {
  return (
    <View style={{display:"flex", alignItems: "center"}}>
    <View style={styles.container}>
      <Button
        title="Loading"
        buttonStyle={{ backgroundColor: "transparent" }}
        loadingProps={{
          size: "small",
          color: "black",
        }}
        loading
        titleStyle={{ fontSize: 18, color: "black" }}
      />
      <Text>Loading results</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    alignItems: "center", 
  },
});

export default Loader;
