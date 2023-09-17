import { createReducer, on } from "@ngrx/store";
import { Folder } from "src/app/core/types/Folder";
import { v4 } from "uuid";

type Status = 'pending' | 'loading' | 'error' | 'success';

export type FoldersState = {

  folders: Folder[];
  error : string | null;
  status : Status;

}

export const initialFolderState : FoldersState = {
  folders : [],
  error : 'null',
  status:'pending'
};


export const noteReducer = createReducer(
  initialFolderState,


);
