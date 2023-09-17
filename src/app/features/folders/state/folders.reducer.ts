import { createReducer, on } from "@ngrx/store";
import { Folder } from "src/app/core/types/Folder";
import { v4 } from "uuid";
import { addFolder, deleteFolder, loadFolders, loadFoldersSuccess, loadFoldersFailure } from "./folders.actions";

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

export const foldersReducer = createReducer(
  initialFolderState,
  on(addFolder,(state,{folder}) =>({
    ...state,
    folders: [...state.folders,folder]
  })),
  on(deleteFolder,(state,{id}) => ({...state,folders:state.folders.filter((f)=>f.id != id)})),
  on(loadFolders,(state) => ({...state,status:'loading' as Status}) ),
  on(loadFoldersSuccess,(state,{folders}) => ({
    ...state,
    folders : folders,
    error: null,
    status:'success' as Status
  })),
  on(loadFoldersFailure,(state,{error}) => ({
    ...state,
    error : error,
    status:'error' as Status
  }))

);
