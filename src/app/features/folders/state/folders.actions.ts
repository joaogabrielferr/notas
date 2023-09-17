import {createAction, props} from '@ngrx/store';
import { Folder } from 'src/app/core/types/Folder';

export const addFolder = createAction(
  'Add Folder',
  props<{folder : Folder}>()
);

export const deleteFolder = createAction(
  'Delete Folder',
  props<{id : string}>()
);

export const loadFolders = createAction('Load Folders');

export const loadFoldersSuccess = createAction('Load Folders Success',props<{folders : Folder[]}>());

export const loadFoldersFailure = createAction('Load Folders Failure',props<{error : string}>());
