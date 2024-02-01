import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon, ListItem } from "react-native-elements";
import Card from "../cards/Card";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { fetchSearch } from "../services/api";
import Loader from "../layout/Loader";
import { BottomSheet } from "react-native-elements";

const SearchPage = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("multi");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("multi");


  const searchOptions = ["tv", "movie", "multi"];

  const handleSearch = async () => {
    setIsLoading(true);

    if (search === "") {
      setIsLoading(false);
      return;
    }

    try {
      setSearchResults([]);
      const results = await fetchSearch(searchType, search);
      setSearchResults(results);
    } catch (error) {
      console.log('error')
    } finally {
      setIsLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <Text style={styles.noResultsText}>Please initiate a search</Text>;
    }

    return <Card data={searchResults} type={searchType} navigation={navigation} />;
  };


  const renderBottomSheetContent = () => (
    <View>
    {searchOptions.map((option, index) => (
      <ListItem
        key={index}
        onPress={() => {
          setSearchType(option);
          setSelectedOption(option); 
          setBottomSheetVisible(false);
        }}
      >
        <ListItem.Content
          style={
            selectedOption === option
              ? CommonStyles.itemActive
              : CommonStyles.itemContainer
          }
        >
          <ListItem.Title
            style={[
              selectedOption === option && CommonStyles.textActive,
            ]}
          >
            {option}
          </ListItem.Title>
            {selectedOption === option && (
          <FontAwesome5 name="check" style={CommonStyles.iconActive} />)}
                
        </ListItem.Content>
      </ListItem>
    ))}
  </View>
  );
  

  return (
    <View style={styles.container}>
      
      <Text>Search Movie/TV Show name
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <Input 
        placeholder="i.e. James Bonds, CSI"
        value={search}
        onChangeText={(e) => setSearch(e)}
        leftIcon={<FontAwesome5 name="search" style={styles.icon} />}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        inputContainerStyle={{backgroundColor: "#ededed",marginTop: 4, borderRadius: 4 }}
      />
      <Text>Choose Search Type
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View>
        <View style={{
          display:"flex", 
          flexDirection: "row", 
          alignItems: "center",
          gap: 20
          }}>
          <Button
          title={selectedOption}
          onPress={() => setBottomSheetVisible(true)}
          buttonStyle={{
            width: "100%",
            justifyContent: "space-between",
          }}
          type="outline"
          titleStyle={{ color: "black", fontSize: 15 }}
          icon={{
            name: "chevron-down",
            type: "font-awesome",
            size: 15,
            color: "grey",
          }}
          iconRight
          containerStyle={{
            width: "60%",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "lightgrey",
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        />
        <BottomSheet
          isVisible={bottomSheetVisible}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          {renderBottomSheetContent()}
        </BottomSheet>
        <Button
          title="Search"
          icon={<FontAwesome5 name="search" style={styles.iconWhite} />}
          onPress={() => handleSearch()}
          buttonStyle={styles.button}
        />
        </View>
      </View>
      
      <Text>Please select a search type</Text>

      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.resultsContainer}>
          {renderSearchResults()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginRight: 20,
  },
  inputText: {
    color: "black",
    fontSize: 15,
  },
  icon: {
    color: "grey",
    fontSize: 15,
  },
  iconWhite: {
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#30839f",
    borderRadius: 5,
    width: "70%",
    display: "flex",
    gap: 5
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 15
  },
  noResultsText: {
    fontSize: 25,
    color: "#555",
    textAlign: "center"
  },
});


const CommonStyles = StyleSheet.create({
  iconActive: {
    color: "white",
  },
  itemActive: {
    backgroundColor: "#377B70",
    padding: 8,
    margin: 0,
    color: "white",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    gap: 20,
    alignItems: "center",
  },
  itemContainer: {
    padding: 4,
  },
  textActive: {
    color: "white",
  },
});


export default SearchPage;
