import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const btnAddHandler = () => {
    if (inputValue !== "") {
      let array = inputValue.split(",");
      array = array.map(
        (el) =>
          el !== "" && { itemName: el.trim().toLowerCase(), isSelected: false }
      );
      const newItems = [...array, ...items];
      setItems(newItems);
      setInputValue("");
    }
  };

  const toggleSelected = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const sortFunction = () => {
    const unselected = items.filter((item) => item.isSelected === false);
    const selected = items.filter((item) => item.isSelected === true);
    setItems([...unselected, ...selected]);
  };

  const newListHandler = () => {
    return Alert.alert("Are you sure?", "This will delete all items.", [
      { text: "Yes", onPress: () => setItems([]) },
      { text: "No" },
    ]);
  };

  const iconCircle = <Icon name="circle" size={20} color="#fff" />;
  const iconCircleV = <Icon name="check-circle" size={20} color="#fff" />;
  const iconSort = <Icon name="sort-amount-down-alt" size={26} color="#000" />;
  const iconPlus = <Icon name="plus" size={26} color="#000" />;
  const iconTrash = <Icon name="trash-alt" size={26} color="#000" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <View style={styles.flex}>
        <Pressable
          style={[styles.btn, styles.success, styles.flex]}
          onPress={btnAddHandler}
        >
          <Text>{iconPlus}</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.warning, styles.flex]}
          onPress={sortFunction}
        >
          <Text>{iconSort}</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.danger, styles.flex]}
          onPress={newListHandler}
        >
          <Text>{iconTrash}</Text>
        </Pressable>
      </View>
      <ScrollView>
        {items.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            {item.isSelected ? (
              <Text
                style={[styles.item, styles.flexEnd]}
                onPress={() => toggleSelected(index)}
              >
                <Text style={styles.strike}> {item.itemName} </Text>
                <Text> {iconCircleV} </Text>
              </Text>
            ) : (
              <Text style={styles.item} onPress={() => toggleSelected(index)}>
                <Text> {iconCircle} </Text>
                <Text> {item.itemName} </Text>
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: 260,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  btn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  itemContainer: {
    width: 260,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
    marginVertical: 2,
  },
  item: {
    fontSize: 20,
    color: "white",
    alignSelf: "flex-start",
  },
  strike: {
    textDecorationLine: "line-through",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexEnd: {
    alignSelf: "flex-end",
  },
  success: {
    backgroundColor: "#00bc8c",
  },
  warning: {
    backgroundColor: "#f39c12",
  },
  danger: {
    backgroundColor: "#e74c3c",
  },
  border: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default App;
