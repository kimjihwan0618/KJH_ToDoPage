import { IToDoItem } from "./ToDoItem.type";

export interface IStatusBoardProps {
  title: string;
  status: "todo" | "progress" | "done";
  todos: IToDoItem[];
  onAddTodo: (status: IStatusBoardProps["status"]) => void;
  onDeleteTodo: (id: number, status: IStatusBoardProps["status"]) => void;
  onToggleEdit: (id: number, status: IStatusBoardProps["status"]) => void;
  onUpdateContent: (
    id: number,
    status: IStatusBoardProps["status"],
    content: string
  ) => void;
}

export interface ITodos {
  todo: IToDoItem[];
  progress: IToDoItem[];
  done: IToDoItem[];
}
