export interface Task {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  image: string | null;
  delete: boolean;
}
