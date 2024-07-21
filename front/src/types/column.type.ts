import { Task } from "./task.type";

export interface Column{
    id: string,
    boardId: string,
    title: string,
    taskOrder: string[],
    tasks: Task[],
    delete: boolean,
}