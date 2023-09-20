import { Note } from "./Note";

export type Folder = {
  id : string;
  name : string;
  notes : Note[];
  created_at: Date;
}
