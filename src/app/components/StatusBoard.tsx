'use client';

import { JSX } from "react";
import { IStatusBoardProps } from "../types/StatusBoard.type";
import ToDoItem from "./ToDoItem";

const bgColors = {
  todo: 'bg-todo',
  progress: 'bg-progress',
  done: 'bg-done'
} as const;

export default function StatusBoard({ title, status, todos, onAddTodo }: IStatusBoardProps): JSX.Element {
    return (
        <section id={status} className={`max-h-[max-content]`}>
            <h2 className={`font-bold sticky rounded-tr-lg top-24 p-4 z-10 shadow ${bgColors[status]}`}>{title}</h2>
            <ul className={`overflow-y-auto p-4 max-h-[calc(100%-4rem)] ${bgColors[status]}`} >
                {todos.length === 0 && (
                    <li className="text-center text-gray-500 py-4">등록된 작업이 없습니다.</li>
                )}
               {todos.map((todo) => (
                 <ToDoItem
                    key={todo.id}
                    id={todo.id}
                    content={todo.content}
                    isEdit={todo.isEdit}
                />
            ))} 
            </ul>
            <button
                onClick={() => onAddTodo(status)}
                className="mt-4 bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500"
            >
                + 새 작업
            </button>
        </section>
    );
};