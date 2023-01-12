import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Alert,
  Dimensions,
  Image,
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
  const [btnsVisible, setbtnsVisible] = useState(false);

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

  const iconSquare = <Icon name="square" size={20} color="#e74c3c" />;
  const iconSquareV = <Icon name="check-square" size={20} color="#00bc8c" />;
  const iconSort = <Icon name="sort-amount-down-alt" size={26} color="#fff" />;
  const iconPlus = <Icon name="plus" size={26} color="#fff" />;
  const iconTrash = <Icon name="trash-alt" size={26} color="#fff" />;
  const iconCart = <Icon name="shopping-basket" size={26} color="#fff" />;
  const iconCD = <Icon name="chevron-circle-down" size={26} color="#2196f3" />;
  const iconCU = <Icon name="chevron-circle-up" size={26} color="#00bc8c" />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#282828" />
      <View style={[styles.header, styles.flex]}>
        <View style={[styles.flexBetween]}>
          <Text style={styles.px20}></Text>
          <Text style={styles.title}>{iconCart} Shopping List</Text>
          {items.length === 0 ? (
            <Text style={styles.px20}></Text>
          ) : (
            <Text
              style={styles.px20}
              onPress={() => setbtnsVisible(!btnsVisible)}
            >
              {btnsVisible ? iconCU : iconCD}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.flex,
            styles.flexRow,
            styles.mt20,
            !btnsVisible && styles.dNone,
          ]}
        >
          <Pressable
            style={[styles.button, styles.warning, styles.flex]}
            onPress={sortFunction}
          >
            <Text>{iconSort}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.danger, styles.flex]}
            onPress={newListHandler}
          >
            <Text>{iconTrash}</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        {items.length === 0 ? (
          <Image style={styles.img} source={require("./assets/image2.png")} />
        ) : (
          items.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              {item.isSelected ? (
                <Text
                  style={[styles.item, styles.flexEnd]}
                  onPress={() => toggleSelected(index)}
                >
                  <Text style={styles.strike}> {item.itemName} </Text>
                  <Text> {iconSquareV} </Text>
                </Text>
              ) : (
                <Text style={styles.item} onPress={() => toggleSelected(index)}>
                  <Text> {iconSquare} </Text>
                  <Text> {item.itemName} </Text>
                </Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    width: windowWidth,
    backgroundColor: "#363636",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 25,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "white",
    width: windowWidth - 80,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  itemContainer: {
    width: windowWidth - 40,
    backgroundColor: "#222222",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "#3d3d3d",
    borderWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexBetween: {
    width: windowWidth - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexEnd: {
    flexDirection: "row",
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
    width: 80,
    borderRadius: 5,
    padding: 10,
    marginStart: 20,
    elevation: 2,
  },
  buttonOpen: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#2196f3",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  opacity: {
    height: windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  mt20: {
    marginTop: 20,
  },
  px20: {
    paddingHorizontal: 20,
  },
  dNone: {
    display: "none",
  },
  img: {
    width: windowWidth,
    height: windowWidth * 1.5,
    resizeMode: "center",
  },
});

export default App;
