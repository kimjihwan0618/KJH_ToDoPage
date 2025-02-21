import { atom } from 'recoil';
import { IToDoItem } from '../types/ToDoItem.type';

export const initTodos = (): object => {
  if (typeof window === 'undefined') return { todo: [], progress: [], done: [] };
  
  return {
    todo: JSON.parse(localStorage.getItem('todoList') || '[]'),
    progress: JSON.parse(localStorage.getItem('progressList') || '[]'),
    done: JSON.parse(localStorage.getItem('doneList') || '[]'),
  };
};

export const todoListState = atom<{
  todo: IToDoItem[];
  progress: IToDoItem[];
  done: IToDoItem[];
}>({
  key: 'todoListState',
  default: initTodos() as { todo: IToDoItem[]; progress: IToDoItem[]; done: IToDoItem[]; },
});