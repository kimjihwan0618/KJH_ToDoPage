"use client";

import { IToDoItem } from "@/app/types/ToDoItem.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";
import ToDoItemButtons from "./ToDoItemButtons";
import { IStatusBoardProps } from "@/app/types/StatusBoard.type";
import ToDoItemContent from "./ToDoItemContent";
import { useState } from "react";

interface ToDoItemProps extends IToDoItem {
  status: IStatusBoardProps["status"];
  onDeleteTodo: (id: number, status: IStatusBoardProps["status"]) => void;
  onToggleEdit: (id: number, status: IStatusBoardProps["status"]) => void;
  onUpdateContent: (
    id: number,
    status: IStatusBoardProps["status"],
    content: string
  ) => void;
}

export default function ToDoItem({
  id,
  content,
  status,
  isEdit,
  onDeleteTodo,
  onToggleEdit,
  onUpdateContent,
}: ToDoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id.toString(),
    data: { status },
  });

  const [isTyping, setIsTyping] = useState(false);

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    position: isDragging ? "relative" : "static",
  };

  const handleEdit = (): void => {
    onToggleEdit(id, status);
  };

  const handleDelete = (): void => {
    onDeleteTodo(id, status);
  };

  return (
    <li className="relative group/item">
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white hover:bg-gray-100 p-6 rounded shadow cursor-pointer mb-3.5 relative
                    ${isDragging ? "opacity-50 !static" : ""}`}
      >
        <ToDoItemContent
          id={id}
          content={content}
          isEdit={isEdit}
          status={status}
          attributes={attributes as unknown as Record<string, unknown>}
          listeners={listeners}
          onUpdateContent={onUpdateContent}
          setIsTyping={setIsTyping}
        />
        <ul className="absolute top-5 right-5">
          <ToDoItemButtons
            onEdit={handleEdit}
            onDelete={handleDelete}
            isEdit={isEdit}
            isTyping={isTyping}
          />
        </ul>
        {isDragging && (
          <span
            className="absolute inset-0 bg-transparent"
            aria-hidden="true"
          />
        )}
      </div>
    </li>
  );
}
