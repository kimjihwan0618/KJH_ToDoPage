'use client';

import { IToDoItem } from "../types/ToDoItem.type";

export default function ToDoItem({ id, content }: IToDoItem) {
    return (
        <li id={id.toString()} className="bg-white hover:bg-gray-100 p-6 rounded shadow cursor-pointer mb-3.5">
            {content}
        </li>   
    )
}           