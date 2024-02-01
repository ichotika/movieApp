import React, { useState } from "react";
import { Button, BottomSheet, ListItem } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Dropdown = ({ title, categories, onPress, onSelect}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handlePress = () => {
    setIsBottomSheetVisible(true);
    onPress && onPress();
  };

  const handleItemPress = (categoryItem) => {
    setIsBottomSheetVisible(false);
    onSelect && onSelect(categoryItem);
  };


  return (
    <>
      <Button
        title={title}
        type="outline"
        titleStyle={{ color: "black", fontSize: 15 }}
        buttonStyle={{
          width: "100%",
          justifyContent: "space-between",
        }}
        containerStyle={{
          width: "60%",
          alignSelf: "center",
          borderColor: "lightgrey",
          borderWidth: 1,
          marginTop: 25,
          marginBottom: 25,
          borderRadius: 5,
        }}
        icon={{
          name: "chevron-down",
          type: "font-awesome",
          size: 15,
          color: "grey",
        }}
        iconRight
        onPress={handlePress}
      />

      <BottomSheet isVisible={isBottomSheetVisible}>
        {categories.map((categoryItem, index) => (
          <ListItem
            key={index}
            onPress={() => handleItemPress(categoryItem)}
            containerStyle={categoryItem.containerStyle}
          >
            <ListItem.Content
              style={
                categoryItem.type === title
                  ? activeItemStyle
                  : containerItemStyle
              }
            >
              <ListItem.Title
                style={[
                  categoryItem.titleStyle,
                  categoryItem.type === title && activeTextStyle,
                ]}
              >
                {categoryItem.type}
              </ListItem.Title>
              {categoryItem.type === title && (
                <FontAwesome5 name="check" style={{ color: "white", fontSize: 20 }} />
              )}
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

const activeItemStyle = {
  backgroundColor: "#377B70",
  padding: 10,
  margin: 0,
  color: "white",
  borderRadius: 4,
  flexDirection: "row",
  justifyContent: "start",
  gap: 10,
  alignItems: "center",
};

const containerItemStyle = {
  padding: 5,
  marginBottom: 0,
};

const activeTextStyle = {
  color: "white",
};

export default Dropdown;
