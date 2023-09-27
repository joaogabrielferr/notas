import { Folder } from "./core/types/Folder";
import { FoldersState } from "./features/folders/state/folders.reducer";

export interface AppState{
  folders: FoldersState;
}


export const welcomeFolder : Folder =
  {
     "id":"ffca295e-aed0-4997-ab7f-47fbfa6c99bd",
     "name":"Getting Started",
     "notes":[
        {
           "id":"4f93823c-dafc-4182-ba90-c5fd4056b488",
           "title":"How Notas work",
           "content":{
              "time":1695825478461,
              "blocks":[
                 {
                    "id":"NrdpoHDePb",
                    "type":"paragraph",
                    "data":{
                       "text":"Notas is a web app built with Angular. It uses NgRx for state management and Editor.js for note writing."
                    }
                 },
                 {
                    "id":"BGtGoqXZvi",
                    "type":"paragraph",
                    "data":{
                       "text":"The notes are saved automatically as you type, and get stored in the local storage of your browser."
                    }
                 },
                 {
                    "id":"yst1yAj_qR",
                    "type":"header",
                    "data":{
                       "text":"How to get started",
                       "level":2
                    }
                 },
                 {
                    "id":"kMzBnbzy1J",
                    "type":"list",
                    "data":{
                       "style":"ordered",
                       "items":[
                          "First you need to create a folder, or use the precreated folder where this note is. You can create a folder in the dashboard, and visualize all folders created in the sidebar at the left.",
                          "After creating a folder, you can create as many notes inside it.&nbsp;",
                          "To edit a note, simply click on it the list,&nbsp;whether on the dashboard or on the folder page",
                          "You can delete notes inside a folder, and also delete a folder. If you choose to delete a folder, all notes inside it will also be deleted.",
                          "You can have an overview of all notes created in the dashboard."
                       ]
                    }
                 }
              ],
              "version":"2.28.0"
           },
           "folder_id":"ffca295e-aed0-4997-ab7f-47fbfa6c99bd",
           "created_at": new Date(),
           "last_updated": new Date()
        }
     ],
     "created_at": new Date()
  }
