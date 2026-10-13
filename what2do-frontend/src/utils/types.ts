export type Todo = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  scheduled_at: Date;
  last_modified: Date;
  status: string;
  created_by: number;
};
