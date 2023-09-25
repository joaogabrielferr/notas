import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {faTable, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent {

  @Output() selectView = new EventEmitter<'table' | 'grid'>();

  @Input({required:true}) view : 'table' | 'grid' = 'table';

  icons = {
    faTable,
    faGrip
  }

  _selectView(op : 'table' | 'grid')
  {
    this.selectView.emit(op);
  }

}
