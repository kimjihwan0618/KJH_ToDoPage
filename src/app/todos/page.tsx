'use client';

import { JSX } from 'react';
import StatusBoard from '../components/StatusBoard';
import { useTodos } from '../hooks/useTodos';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ITodos } from '../types/StatusBoard.type';
import { IToDoItem } from '../types/ToDoItem.type';

export default function ToDosPage(): JSX.Element {
  const { todos, addTodo, updateTodos } = useTodos();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeStatus = active.data.current?.status as keyof ITodos;
    const overStatus = (over.data.current?.status || over.id) as keyof ITodos;

    if (activeStatus === overStatus && activeStatus in todos) {
      // 같은 보드 내에서의 이동
      const oldIndex = todos[activeStatus].findIndex((todo: IToDoItem) => todo.id.toString() === activeId);
      const newIndex = todos[activeStatus].findIndex((todo: IToDoItem) => todo.id.toString() === overId);

      const newTodos: ITodos = {
        ...todos,
        [activeStatus]: arrayMove(todos[activeStatus], oldIndex, newIndex),
      };
      updateTodos(newTodos);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeStatus = active.data.current?.status as keyof ITodos;
    const overStatus = (over.data.current?.status || over.id) as keyof ITodos;

    if (activeStatus !== overStatus && activeStatus in todos && overStatus in todos) {
      // 다른 보드로의 이동
      const activeId = active.id;
      const item = todos[activeStatus].find((todo: IToDoItem) => todo.id.toString() === activeId);
      if (!item) return;

      const newTodos: ITodos = {
        ...todos,
        [activeStatus]: todos[activeStatus].filter((todo: IToDoItem) => todo.id.toString() !== activeId),
        [overStatus]: [...todos[overStatus], item],
      };
      updateTodos(newTodos);
    }
  };

  return (
    <>
      <h1 className="fixed top-0 text-2xl font-bold w-full p-8 bg-white z-20 shadow-sm">ToDoPage</h1>
      <div className="h-screen pt-24">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <main className="grid grid-cols-3 gap-4 p-8">
            <StatusBoard
              title="시작 전"
              status="todo"
              todos={todos.todo}
              onAddTodo={addTodo}
            />
            <StatusBoard
              title="진행중"
              status="progress"
              todos={todos.progress}
              onAddTodo={addTodo}
            />
            <StatusBoard
              title="완료"
              status="done"
              todos={todos.done}
              onAddTodo={addTodo}
            />
          </main>
        </DndContext>
      </div>
    </>
  );
}
        