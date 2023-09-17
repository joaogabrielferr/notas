import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadFolders } from './features/folders/state/folders.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notas';


  constructor(private store : Store){}

  ngOnInit(): void {
    this.store.dispatch(loadFolders());
  }
}
