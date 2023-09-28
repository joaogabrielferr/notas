import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {faTable, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Output() selectView = new EventEmitter<'table' | 'grid'>();

  @Output() sortNotes = new EventEmitter<string>();

  @Input({required:true}) view : 'table' | 'grid' = 'table';

  sortOption : string = "sort";

  icons = {
    faTable,
    faGrip
  }

  ngOnInit(): void {
      this.sortOption = 'sort';
  }

  _selectView(op : 'table' | 'grid')
  {
    this.selectView.emit(op);
  }

  _sortNotes(op : string)
  {
    if(op == 'sort')return;
    this.sortNotes.emit(op);
  }



}
