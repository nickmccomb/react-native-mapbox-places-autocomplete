import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { closeBtnUri } from "./images";
import usePlacesAutocomplete from "./utils/usePlacesAutocomplete";

/**
 * Main Component
 */
const MapboxPlacesAutocomplete = ({
  inputStyle,
  containerStyle,
  inputClassName = "",
  containerClassName = "",
  placeholder = "Address",
  accessToken = "",
  onPlaceSelect,
  onClearInput,
  setValue,
  value,
  onPressIn,
}) => {
  const id = "origin";
  const placesAutocomplete = usePlacesAutocomplete(
    accessToken,
    setValue,
    value
  );

  return (
    <View
      style={[styles.container, containerStyle]}
      className={containerClassName}
    >
      {placesAutocomplete.suggestions?.length > 0 && value && (
        <PlaceSuggestionList
          {...{ placesAutocomplete, onPlaceSelect }}
          setValue={setValue}
        />
      )}
      <TextInput
        autoCorrect={false}
        value={value}
        {...{ ...placesAutocomplete, placeholder }}
        style={inputStyle}
        className={inputClassName}
        onPressIn={onPressIn}
      />
      {value && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setValue("");
            onClearInput({ id }); // tell the consumer about which input is cleared
          }}
        >
          <Image source={closeBtnUri} style={styles.clearBtnImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

/** Place Suggestion List below text input */
const PlaceSuggestionList = ({
  placesAutocomplete,
  onPlaceSelect,
  setValue,
}) => {
  return (
    <View style={styles.suggestionList}>
      {placesAutocomplete.suggestions.map((suggestion, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setValue(suggestion.place_name);
              placesAutocomplete.setSuggestions([]);
              onPlaceSelect && onPlaceSelect(suggestion);
            }}
          >
            <Text style={styles.suggestionItem}>{suggestion.place_name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MapboxPlacesAutocomplete;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    position: "relative",
    height: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtnImage: { width: 20, height: 20 },
  clearBtn: { position: "absolute", top: 6, right: 5 },
  suggestionList: {
    position: "absolute",
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#212121",
    borderRadius: 4,
    marginHorizontal: 2,
    top: -5,
    left: -40,
    right: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: "#333",
    borderWidth: 1,
  },
  suggestionItem: {
    color: "#FFFFFF",
    fontWeight: "300",
    fontSize: 14,
    paddingVertical: 14,
  },
  creditBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 4,
  },
  creditText: {
    color: "#6b7280",
    fontWeight: "400",
    fontSize: 12,
    padding: 2,
  },
  creditImage: { width: 16, height: 16, marginLeft: 2 },
});
