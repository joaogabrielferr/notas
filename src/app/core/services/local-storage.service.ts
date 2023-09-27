import { Injectable } from "@angular/core";
import { Note } from "../types/Note";
import { Folder } from "../types/Folder";
import { Observable, firstValueFrom, of } from "rxjs";
import { cloneDeep } from "lodash";
import { welcomeFolder } from "src/app/app.state";



export interface LocalStorageState{
  folders : Folder[],
  initialized : boolean
}


@Injectable({
  providedIn:'root'
})
export class LocalStorageService{

  key : string = "notas-app";


  async saveFolder(folder : Folder)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    state.folders.push(folder);
    this.saveState(state);
  }

  async saveFolders(folders : Folder[])
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    const newState = cloneDeep(state);
    newState.folders = folders;
    this.saveState(newState);
  }

  async saveNote(note : Note)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    const newState = cloneDeep(state);
    const folderIndex = newState.folders.findIndex((f)=>f.id === note.folder_id);

    const folder = {...newState.folders[folderIndex]};

    folder.notes = [...folder.notes,note];

    newState.folders[folderIndex] = folder;

    this.saveState(newState);
  }

  async updateNote(note : Note)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    const newState = cloneDeep(state);

    const folderIndex = newState.folders.findIndex((f)=>f.id === note.folder_id);

    const noteIndex = newState.folders[folderIndex].notes.findIndex((n)=>n.id === note.id);

    newState.folders[folderIndex].notes[noteIndex] = note;

    this.saveState(newState);
  }

  async deleteNote(note : Note)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());

    const newState = cloneDeep(state);

    const folderIndex = newState.folders.findIndex((f)=>f.id === note.folder_id);

    newState.folders[folderIndex].notes = newState.folders[folderIndex].notes.filter((f)=>f.id != note.id);

    this.saveState(newState);

  }

  async deleteFolder(id : string)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());

    const newState = cloneDeep(state);

    newState.folders = newState.folders.filter((f) => f.id != id);

    this.saveState(newState);


  }


  getState() : Observable<LocalStorageState>
  {
    const stateString = localStorage.getItem(`${this.key}`);
    const state : LocalStorageState = stateString ? JSON.parse(stateString) || {} as LocalStorageState : {} as LocalStorageState;

    if(!state.folders)
    {
      state.folders = [];
    }

    if(!state.initialized)
    {
      state.initialized = true;
      state.folders = [welcomeFolder];
      this.saveState(state);
    }


    return of(state);
  }

  saveState(state : LocalStorageState)
  {
    localStorage.setItem(`${this.key}`,JSON.stringify(state));
  }


}
