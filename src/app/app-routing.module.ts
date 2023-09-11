import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/ui/home/home.component';
import { NoteComponent } from './features/note/pages/note/note.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
