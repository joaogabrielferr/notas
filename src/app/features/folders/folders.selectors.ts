import { AppState } from "src/app/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Folder } from "src/app/core/types/Folder";
import { FoldersState } from "./state/folders.reducer";

const foldersFeature = createFeatureSelector<FoldersState>('folders');

export const selectAllFolders = createSelector(foldersFeature,(state : FoldersState) => state.folders);
