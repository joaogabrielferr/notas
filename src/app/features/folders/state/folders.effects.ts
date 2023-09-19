import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { LocalStorageService, LocalStorageState } from "src/app/core/services/local-storage.service";
import { catchError, from, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { addFolder, addNote, deleteFolder, loadFolders, loadFoldersFailure, loadFoldersSuccess } from "./folders.actions";
import { selectAllFolders } from "./folders.selectors";
import { Folder } from "src/app/core/types/Folder";


@Injectable()
export class FoldersEffects{


  constructor(
    private actions$ : Actions,
    private state : Store<AppState>,
    private localStorageService : LocalStorageService,
    private store : Store
    ){}

    loadFolders$ = createEffect(()=>
      this.actions$.pipe(
        ofType(loadFolders),
        mergeMap(
          ()=>{
            return this.localStorageService.getState()
            .pipe(map((state : LocalStorageState) => loadFoldersSuccess({folders : state.folders}))
            ,
            catchError(error => of(loadFoldersFailure({error:"could not load folders"})))
            );
          }
        )
      )
    );

    saveFolder$ = createEffect(
      () => this.actions$.pipe(
        ofType(addFolder),
        mergeMap(({folder}) => this.localStorageService.saveFolder(folder)),
      ).pipe(tap(()=>console.log("in saveFolder$ effect"))),
      {dispatch:false}
    );

    saveNote$ = createEffect(()=>
    this.actions$.pipe(
      ofType(addNote),
      mergeMap(({note}) => this.localStorageService.saveNote(note)),
    ).pipe(tap((value)=>console.log("in saveNote$ effect ",value))),
    {dispatch:false}
  );


}


