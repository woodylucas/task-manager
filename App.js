import React, { useState, useCallback } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Button } from "react-native";

import GoalItem from "./src/components/GoalItem";
import GoalInput from "./src/components//GoalInput";

import * as Crypto from "expo-crypto";

import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddGoal = useCallback((text) => {
    setCourseGoals((prevGoal) => [
      { id: Crypto.randomUUID(), text },
      ...prevGoal,
    ]);

    setModalVisible(false);
  }, []);

  const handleDeleteGoal = useCallback((id) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={handleOpenModal}
        />
        <GoalInput
          onAddGoal={handleAddGoal}
          modalVisible={modalVisible}
          onClose={setModalVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={({ item }) => (
              <GoalItem item={item} onDelete={handleDeleteGoal} />
            )}
            key={({ item: { id } }) => id}
          />
        </View>
      </SafeAreaView>
      <ExpoStatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginLeft: 8,
    marginRight: 24,
  },

  goalsContainer: {
    flex: 5,
  },
});
