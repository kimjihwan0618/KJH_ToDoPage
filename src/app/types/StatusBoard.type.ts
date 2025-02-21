import { IToDoItem } from "./ToDoItem.type";

export interface IStatusBoardProps {
    title: string;
    status: 'todo' | 'progress' | 'done';
    todos: IToDoItem[];
    onAddTodo: (status: 'todo' | 'progress' | 'done') => void;
}

export interface ITodos {
    todo: IToDoItem[];
    progress: IToDoItem[];
    done: IToDoItem[];
}
