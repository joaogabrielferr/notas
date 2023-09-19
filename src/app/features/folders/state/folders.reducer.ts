import { createReducer, on } from "@ngrx/store";
import { Folder } from "src/app/core/types/Folder";
import { addFolder, deleteFolder, loadFolders, loadFoldersSuccess, loadFoldersFailure, addNote } from "./folders.actions";
import { cloneDeep } from "lodash";

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
  on(addFolder,(state,{folder}) =>{
    console.log("aqui addFolder");
    return ({
    ...state,
    folders: [...state.folders,folder].sort((a : Folder,b:Folder)=> a.name.localeCompare(b.name))
  })
}),
  on(deleteFolder,(state,{id}) => ({...state,folders:state.folders.filter((f)=>f.id != id)})),
  on(loadFolders,(state) => ({...state,status:'loading' as Status}) ),
  on(loadFoldersSuccess,(state,{folders}) => ({
    ...state,
    folders : [...folders].sort((a : Folder,b:Folder)=> a.name.localeCompare(b.name)),
    error: null,
    status:'success' as Status
  })),
  on(loadFoldersFailure,(state,{error}) => ({
    ...state,
    error : error,
    status:'error' as Status
  })),
  on(addNote,(state,{note}) =>{


    const newState = cloneDeep(state);

    const folderIndex = newState.folders.findIndex((f)=>f.id === note.folder_id);

    if(folderIndex === -1)return newState;

    newState.folders[folderIndex].notes = [...newState.folders[folderIndex].notes,note];

    return newState;

  })

);
