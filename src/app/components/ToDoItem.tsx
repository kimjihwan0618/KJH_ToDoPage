'use client';

import { IToDoItem } from "../types/ToDoItem.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ToDoItemProps extends IToDoItem {
  status: string;
}

export default function ToDoItem({ id, content, status }: ToDoItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id.toString(), data: { status } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white hover:bg-gray-100 p-6 rounded shadow cursor-pointer mb-3.5"
        >
            {content}
        </li>   
    );
}           