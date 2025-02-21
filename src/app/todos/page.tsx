'use client';

import { JSX, useState } from 'react';
import StatusBoard from '../components/StatusBoard';
import { IToDoItem } from '../types/ToDoItem.type';
import { IStatusBoardProps } from '../types/StatusBoard.type';

export default function ToDosPage (): JSX.Element {
  const [todoList, setTodoList] = useState<IToDoItem[]>([]);
  const [progressList, setProgressList] = useState<IToDoItem[]>([]);
  const [doneList, setDoneList] = useState<IToDoItem[]>([]);

  // api
  const addTodo = (status: IStatusBoardProps['status']): void => {
    const newTodo: IToDoItem = {
      id: Date.now(),
      content: '새 작업',
      isEdit: false,
    };
    if (status === 'todo') {
      setTodoList([...todoList, newTodo]);
    } else if (status === 'progress') {
      setProgressList([...progressList, newTodo]);
    } else if (status === 'done') {
      setDoneList([...doneList, newTodo]);
    }
  };

  return (
    <>
      <h1 className="fixed top-0 text-2xl font-bold w-full p-8 bg-white z-20 shadow-sm">할 일 목록</h1>
      <div className="h-screen pt-24">
        <main className="grid grid-cols-3 gap-4 p-8">
          <StatusBoard
            title="시작 전"
            status="todo"
            todos={todoList}
            onAddTodo={addTodo}
          />
          <StatusBoard
            title="진행중"
            status="progress"
            todos={progressList}
            onAddTodo={addTodo}
          />
          <StatusBoard
            title="완료"
            status="done"
            todos={doneList}
            onAddTodo={addTodo}
          />
        </main>
      </div>
    </>
  );
}
        