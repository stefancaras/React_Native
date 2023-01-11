import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const btnAddHandler = () => {
    if (inputValue !== "") {
      let array = inputValue.split(",").reverse();
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

  const iconCircle = <Icon name="circle" size={20} color="#000" />;
  const iconCircleV = <Icon name="check-circle" size={20} color="#000" />;
  const iconSort = <Icon name="sort-amount-down-alt" size={26} color="#000" />;
  const iconPlus = <Icon name="plus" size={26} color="#000" />;
  const iconTrash = <Icon name="trash-alt" size={26} color="#000" />;
  const iconCart = <Icon name="cart-plus" size={26} color="#fff" />;
  const iconDots = <Icon name="ellipsis-v" size={26} color="#fff" />;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.flex, styles.opacity]}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add items</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputValue}
              value={inputValue}
              placeholder="Enter items here"
              placeholderTextColor="#b5b5b5"
            />
            <View style={styles.flexEnd}>
              <Pressable
                style={[styles.button, styles.danger]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.success]}
                onPress={() => {
                  btnAddHandler();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>ADD</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable
        style={[styles.flex, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text>{iconPlus}</Text>
      </Pressable>
      <StatusBar backgroundColor="#102027" />
      <View style={[styles.header, styles.flex]}>
        <Text style={styles.flexBetween}>
          <Text style={styles.title}>{iconCart} Shopping List</Text>
          <Text style={styles.flexEnd} onPress={btnAddHandler}>
            {iconDots}
          </Text>
        </Text>
        <View style={[styles.flex, styles.flexRow]}>
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
    backgroundColor: "gray",
    alignItems: "center",
  },
  header: {
    width: windowWidth,
    backgroundColor: "#37474f",
  },
  title: {
    alignSelf: "flex-start",
    color: "white",
    fontSize: 25,
    marginVertical: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "white",
    width: windowWidth - 100,
    borderWidth: 1,
    borderColor: "white",
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
  flexRow: {
    flexDirection: "row",
  },
  flexBetween: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexEnd: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  flexCenter: {
    alignSelf: "flex-center",
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
    borderColor: "white",
    borderWidth: 5,
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 50,
    alignItems: "center",
    backgroundColor: "#464646",
    borderRadius: 20,
    padding: 20,
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
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#00bc8c",
    borderRadius: 30,
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  opacity: {
    height: windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default App;
