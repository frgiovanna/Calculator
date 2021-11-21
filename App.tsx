import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

export default function App() {
  const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentIndex: 0,
  };

  const [valueState, setValueState] = useState({ ...initialState });

  const addDigit = (selectedNumber: string) => {
    const clearDisplay =
      valueState.displayValue === "0" || valueState.clearDisplay;

    if (
      selectedNumber === "." &&
      !clearDisplay &&
      valueState.displayValue.includes(".")
    ) {
      return;
    }

    const currentValue = clearDisplay ? "" : valueState.displayValue;

    const displayValue = `${currentValue}${selectedNumber}`;

    setValueState((prevState) => ({
      ...prevState,
      displayValue: displayValue,
    }));

    if (selectedNumber != ".") {
      const newValue = parseFloat(displayValue);
      const values = [...valueState.values];
      values[valueState.currentIndex] = newValue;
      setValueState((prevState) => ({ ...prevState, values }));
    }
  };

  const clearMemory = () => {
    setValueState({ ...initialState });
  };

  const setOperation = (operation) => {
    if (valueState.currentIndex === 0) {
      setValueState((prevState) => ({
        ...prevState,
        operation,
        currentIndex: 1,
        clearDisplay: true,
      }));
    } else {
      const equals = operation === "=";
      const values = [...valueState.values];
      try {
        values[0] = eval(`${values[0]} ${valueState.operation} ${values[1]}`);
      } catch (e) {
        values[0] = valueState.values[0];
      }

      values[1] = 0;
      setValueState((prevState) => ({
        ...prevState,
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        clearDisplay: true,
        values,
      }));
    }
  };
  return (
    <View style={styles.container}>
      <Display value={valueState.displayValue} />
      <View style={styles.calculatorWrapper}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculatorWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
