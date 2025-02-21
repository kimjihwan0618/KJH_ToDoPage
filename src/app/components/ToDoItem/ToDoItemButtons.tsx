import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IToDoItemButtonsProps } from "../../types/ToDoItem.type";

export default function ToDoItemButtons({
  onEdit,
  onDelete,
  isEdit,
  isTyping,
}: IToDoItemButtonsProps): JSX.Element {
  if (isTyping) return <></>;

  return (
    <div
      role="toolbar"
      aria-label="작업 관리 도구"
      className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
    >
      <button
        type="button"
        className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit();
        }}
        aria-label={isEdit ? "수정 취소" : "작업 수정"}
      >
        {isEdit ? (
          <XMarkIcon className="w-4 h-4 text-gray-600" />
        ) : (
          <PencilIcon className="w-4 h-4 text-gray-600" />
        )}
      </button>
      <button
        type="button"
        className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        aria-label="작업 삭제"
      >
        <TrashIcon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
