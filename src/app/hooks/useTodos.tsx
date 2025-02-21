"use client";

import { IToDoItem } from "@/app/types/ToDoItem.type";
import { IStatusBoardProps, ITodos } from "../types/StatusBoard.type";
import { useState, useEffect } from "react";

const DEFAULT_TODOS: ITodos = {
  todo: [] as IToDoItem[],
  progress: [] as IToDoItem[],
  done: [] as IToDoItem[],
} as const;

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodos>(DEFAULT_TODOS);
  const [loading, setLoading] = useState<boolean>(true);

  const addTodo = (status: IStatusBoardProps["status"]): void => {
    const id = Date.now();
    const newTodoItem: IToDoItem = {
      id,
      content: "새 작업",
      isEdit: false,
    };
    const newTodo = {
      ...todos,
      [status]: [...todos[status], newTodoItem],
    };
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const deleteTodo = (
    id: number,
    status: IStatusBoardProps["status"]
  ): void => {
    const newTodos = {
      ...todos,
      [status]: todos[status].filter((todo) => todo.id !== id),
    };
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const updateTodos = (newTodos: ITodos): void => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const initTodos = (): void => {
    setTodos(
      JSON.parse(localStorage.getItem("todos") || JSON.stringify(DEFAULT_TODOS))
    );
  };

  const toggleEdit = (
    id: number,
    status: IStatusBoardProps["status"]
  ): void => {
    const newTodos = {
      ...todos,
      [status]: todos[status].map((todo) =>
        todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
      ),
    };
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const updateContent = (
    id: number,
    status: IStatusBoardProps["status"],
    content: string,
    isEdit?: boolean
  ): void => {
    const newTodos = {
      ...todos,
      [status]: todos[status].map((todo) =>
        todo.id === id
          ? {
              ...todo,
              content,
              isEdit: isEdit === undefined ? todo.isEdit : isEdit,
            }
          : todo
      ),
    };
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    initTodos();
    setLoading(false);
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleEdit,
    updateContent,
    updateTodos,
    initTodos,
    loading,
  };
};
