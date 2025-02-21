'use client';

import { IToDoItem } from "../types/ToDoItem.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from 'react';

interface ToDoItemProps extends IToDoItem {
  status: string;
}

export default function ToDoItem({ id, content, status, isEdit }: ToDoItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: id.toString(), data: { status } });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: isDragging ? 'relative' : 'static',
    };

    return (
        <li 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white hover:bg-gray-100 p-6 rounded shadow cursor-pointer mb-3.5
                ${isDragging ? 'opacity-50 !static' : ''}`}
        >
            {content}
            {isDragging && (
                <div className="absolute inset-0 bg-transparent" aria-hidden="true" />
            )}
        </li>   
    );
}           