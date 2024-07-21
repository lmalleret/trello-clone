export interface ActionState {
  title: string;
  content: React.ReactNode;
  action: (() => void) | null;
}
