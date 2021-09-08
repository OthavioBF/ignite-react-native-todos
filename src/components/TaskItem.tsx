import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/pencil/Pen.png";

import { EditTaskArgs } from "../pages/Home";
import { Task } from "../components/TasksList";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [editingTask, setEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditingTask(true);
  }

  function handleCancelEditing() {
    setEditedTask(task.title);
    setEditingTask(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: editedTask });
    setEditingTask(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      editingTask === true
        ? textInputRef.current.focus()
        : textInputRef.current.blur();
    }
  }, [editingTask]);

  return (
    <View style={styles.Container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => {
            toggleTaskDone(task.id);
          }}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editedTask}
            onChangeText={setEditedTask}
            editable={editingTask}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {editingTask ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={editingTask}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: editingTask ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: "rgba(196, 196, 196, 0.24)",
  },
  Container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
    marginHorizontal: 12,
  },
});
