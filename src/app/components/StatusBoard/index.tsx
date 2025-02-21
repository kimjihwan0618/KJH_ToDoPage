"use client";

import { JSX } from "react";
import { IStatusBoardProps } from "@/app/types/StatusBoard.type";
import ToDoItem from "@/app/components/ToDoItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const bgColors = {
  todo: "bg-todo",
  progress: "bg-progress",
  done: "bg-done",
} as const;

export default function StatusBoard({
  title,
  status,
  todos,
  onAddTodo,
  onDeleteTodo,
  onToggleEdit,
  onUpdateContent,
}: IStatusBoardProps): JSX.Element {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <section id={status} className="max-h-[max-content]">
      <h2
        className={`font-bold sticky rounded-tr-lg top-24 p-4 z-10 shadow ${bgColors[status]}`}
      >
        {title}
      </h2>
      <div
        ref={setNodeRef}
        className={`p-4 max-h-[calc(100%-4rem)] ${bgColors[status]} overflow-y-auto relative`}
      >
        <SortableContext
          items={todos.map((todo) => todo.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <ul className="overflow-hidden relative">
            {todos.length === 0 && (
              <li className="text-center text-gray-500 py-4">
                등록된 작업이 없습니다.
              </li>
            )}
            {todos.map((todo) => (
              <ToDoItem
                key={todo.id}
                {...todo}
                status={status}
                isEdit={todo.isEdit}
                onDeleteTodo={onDeleteTodo}
                onToggleEdit={onToggleEdit}
                onUpdateContent={onUpdateContent}
              />
            ))}
          </ul>
        </SortableContext>
      </div>
      <button
        onClick={() => onAddTodo(status)}
        className="mt-4 bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500"
      >
        + 새 작업
      </button>
    </section>
  );
}
