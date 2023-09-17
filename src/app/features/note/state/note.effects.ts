import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { LocalStorageService } from "src/app/core/services/local-storage.service";


@Injectable()
export class NoteEffects{

  // loadFolders$ = createEffect(()=>
  //   this.actions$.pipe(
  //     ofType(loadFolders),
  //     mergeMap(
  //       ()=>{
  //         return this.localStorageService.getState()
  //         .pipe(map((state : AppState) => loadFoldersSuccess({folders : state.folders.folders}))
  //         ,
  //         catchError(error => of(loadFoldersFailure({error:"could not load folders"})))
  //         );
  //       }
  //     )
  //     )
  //     );

  constructor(
    private actions$ : Actions,
    private state : Store<AppState>,
    private localStorageService : LocalStorageService
  ){}


}
