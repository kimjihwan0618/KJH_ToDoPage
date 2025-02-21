'use client';

import { IToDoItem } from "@/app/types/ToDoItem.type";
import { IStatusBoardProps, ITodos } from "../types/StatusBoard.type";
import { useState, useEffect } from "react";

const DEFAULT_TODOS: ITodos = {
  todo: [] as IToDoItem[],
  progress: [] as IToDoItem[],
  done: [] as IToDoItem[]
} as const;

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodos>(DEFAULT_TODOS);
  
  const addTodo = (status: IStatusBoardProps['status']): void => {
    const id = Date.now();
    const newTodoItem: IToDoItem = {
      id,
      content: '새 작업' + id,
      isEdit: false,
    };
    const newTodo = {
      ...todos,
      [status]: [...todos[status], newTodoItem],
    }
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }

  const updateTodos = (newTodos: ITodos): void => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const initTodos = (): void => {
    setTodos(JSON.parse(localStorage.getItem("todos") || JSON.stringify(DEFAULT_TODOS)));
  }

  useEffect(() => {
    initTodos();
  }, []);

  return { todos, addTodo, updateTodos, initTodos };
};