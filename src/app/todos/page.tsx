'use client';

import { JSX } from 'react';
import StatusBoard from '../components/StatusBoard';
import { useTodos } from '../hooks/useTodos';

export default function ToDosPage (): JSX.Element {
  const { todos, addTodo } = useTodos();

  return (
    <>
      <h1 className="fixed top-0 text-2xl font-bold w-full p-8 bg-white z-20 shadow-sm">할 일 목록</h1>
      <div className="h-screen pt-24">
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
      </div>
    </>
  );
}
        