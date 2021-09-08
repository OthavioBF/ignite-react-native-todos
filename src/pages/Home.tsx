import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const sameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (sameTitle) {
      return Alert.alert(
        "Task ja cadastrada",
        "Voce não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const taskToBeUpdated = updatedTasks.find((task) => task.id === taskId);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const findTask = updatedTasks.find((task) => task.id === id);

    if (!findTask) return;

    findTask.done = !findTask.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que voce deseja remover esse item?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);

            setTasks(updatedTasks);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
