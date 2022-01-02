import React from "react";
import { StyleSheet, Text, Dimensions, TouchableHighlight } from "react-native";

interface IButton {
  double?: boolean;
  triple?: boolean;
  operation?: boolean;
  label: string;
  onClick: (label: string) => void;
}

const Button = ({ double, triple, operation, label, onClick }: IButton) => {
  
  const addicionalStyle = () => {
    if (double) return styles.buttonDouble;
    if (triple) return styles.buttonTriple;
    if (operation) return styles.operationButton;
  }
  const stylesButton = [styles.button, addicionalStyle()];
  return (
    <TouchableHighlight onPress={() => onClick(label)}>
      <Text style={stylesButton}>{label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#888",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});

export default Button;
