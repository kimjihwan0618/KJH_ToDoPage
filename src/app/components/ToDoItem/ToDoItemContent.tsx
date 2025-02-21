"use client";

import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { IToDoItemContentProps } from "@/app/types/ToDoItem.type";

export default function ToDoItemContent({
  id,
  content,
  isEdit,
  status,
  attributes,
  listeners,
  onUpdateContent,
  setIsTyping,
}: IToDoItemContentProps): JSX.Element {
  const [value, setValue] = useState(content);

  const debouncedUpdate = useCallback(
    debounce((newValue: string) => {
      onUpdateContent(id, status, newValue);
      setIsTyping(false);
    }, 700),
    [id, status, onUpdateContent, setIsTyping]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsTyping(true);
    debouncedUpdate(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedUpdate.cancel();
      setIsTyping(false);
      onUpdateContent(id, status, value, false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  useEffect(() => {
    setValue(content);
  }, [content]);

  return (
    <>
      {isEdit ? (
        <article className="flex-1">
          <textarea
            defaultValue={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
            aria-label="작업 내용 수정"
            autoFocus
          />
        </article>
      ) : (
        <article {...attributes} {...listeners} className="flex-1">
          <p className="break-words">
            {content === "" ? "내용 없음" : content}
          </p>
        </article>
      )}
    </>
  );
}
