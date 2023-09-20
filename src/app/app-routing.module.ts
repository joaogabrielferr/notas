import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/ui/home/home.component';
import { NoteComponent } from './features/note/pages/note/note.component';
import { FolderComponent } from './features/folders/page/folder/folder.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'note/:id',
    component:HomeComponent,
    children:[
      {
        path:'',
        component:NoteComponent
      }
    ]
  },{
    path:'folder/:id',
    component: HomeComponent,
    children:[
      {
        path:'',
        component:FolderComponent
      }
    ]
  },{
    path:'404',
    component: HomeComponent,
    children:[
      {
        path:'',
        component:PageNotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
