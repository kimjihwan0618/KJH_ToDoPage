import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { IStatusBoardProps } from "./StatusBoard.type";

export interface IToDoItem {
  id: number;
  content: string;
  isEdit: boolean;
}

export interface IToDoItemButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  isEdit: boolean;
  isTyping: boolean;
}

export interface IToDoItemContentProps {
  id: number;
  content: string;
  isEdit: boolean;
  status: IStatusBoardProps["status"];
  attributes?: Record<string, unknown>;
  listeners?: SyntheticListenerMap;
  onUpdateContent: (
    id: number,
    status: IStatusBoardProps["status"],
    content: string,
    isEdit?: boolean
  ) => void;
  setIsTyping: (isTyping: boolean) => void;
}
