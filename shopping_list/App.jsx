import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Alert,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const btnAddHandler = () => {
    if (inputValue !== "") {
      const array = inputValue
        .split(",")
        .reverse()
        .filter((el) => el !== "")
        .map((el) => {
          return { itemName: el.trim().toLowerCase(), isSelected: false };
        });
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

  const iconCircle = <Icon name="circle" size={20} color="#000" />;
  const iconCircleV = <Icon name="check-circle" size={20} color="#000" />;
  const iconSort = <Icon name="sort-amount-down-alt" size={26} color="#000" />;
  const iconPlus = <Icon name="plus" size={26} color="#000" />;
  const iconTrash = <Icon name="trash-alt" size={26} color="#000" />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#102027" />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TextInput
                style={styles.input}
                onChangeText={setInputValue}
                value={inputValue}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>

      <View style={[styles.header, styles.flex]}>
        <Text style={styles.title}>Shopping List</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
        />
        <View style={styles.flexBetween}>
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
    backgroundColor: "#37474f",
    alignItems: "center",
  },
  header: {
    width: windowWidth,
    backgroundColor: "#37474f",
  },
  title: {
    color: "white",
    fontSize: 25,
    marginVertical: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    width: windowWidth - 40,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  btn: {
    width: (windowWidth - 60) / 3,
    height: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  itemContainer: {
    width: windowWidth,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 1,
  },
  item: {
    fontSize: 20,
    color: "black",
    alignSelf: "flex-start",
  },
  strike: {
    textDecorationLine: "line-through",
  },
  flex: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexBetween: {
    width: windowWidth - 40,
    flexDirection: "row",
    justifyContent: "space-between",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#464646",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    bottom: 20,
    left: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
