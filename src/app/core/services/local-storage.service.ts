import { Injectable } from "@angular/core";
import { Note } from "../types/Note";
import { Folder } from "../types/Folder";
import { Observable, firstValueFrom, of } from "rxjs";
import { FoldersState, initialFolderState } from "src/app/features/note/state/note.reducer";


export interface LocalStorageState{
  folders : Folder[]
}


@Injectable({
  providedIn:'root'
})
export class LocalStorageService{

  key : string = "notas-app";


  async saveFolder(folder : Folder)
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    console.log("state:",state,"folder:",folder);
    state.folders.push(folder);
    this.saveState(state);
  }

  async saveFolders(folders : Folder[])
  {
    const state : LocalStorageState = await firstValueFrom(this.getState());
    const newState = {...state};
    newState.folders = folders;
    console.log("saving:",newState);
    this.saveState(newState);
  }


  getState() : Observable<LocalStorageState>
  {
    const stateString = localStorage.getItem(`${this.key}`);
    const state : LocalStorageState = stateString ? JSON.parse(stateString) || {} as LocalStorageState : {} as LocalStorageState;
    console.log("state:",state);

    if(!state.folders)
    {
      state.folders = [];
    }

    return of(state);
  }

  saveState(state : LocalStorageState)
  {
    localStorage.setItem(`${this.key}`,JSON.stringify(state));
  }


}
