import { IStatusBoardProps } from "@/app/types/StatusBoard.type";
import { IToDoItem } from "@/app/types/ToDoItem.type";
import { SetterOrUpdater } from "recoil";

interface TodoActions {
  addTodo: (status: IStatusBoardProps['status'], setTodos: SetterOrUpdater<{
    todo: IToDoItem[];
    progress: IToDoItem[];
    done: IToDoItem[];
  }>) => void;
}

export const todoActions: TodoActions = {
  addTodo: (status, setTodos) => {
    const testid = Date.now();
    const newTodo: IToDoItem = {
      id: testid,
      content: '새 작업' + testid,
      isEdit: false,
    };

    setTodos(prev => ({
      ...prev,
      [status]: [...prev[status], newTodo],
    }));
  }
};