import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-folder-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-folder-modal.component.html',
  styleUrls: ['./add-folder-modal.component.scss']
})
export class AddFolderModalComponent implements AfterViewInit  {

  @Output() confirm = new EventEmitter<string>();
  @Output() close = new EventEmitter<boolean>();

  @ViewChild('folderNameInput') folderNameInput! : ElementRef;


  ngAfterViewInit(): void {
      this.folderNameInput.nativeElement.focus();
  }

  toggleClose(): void
  {
    this.close.emit(true);
  }

  _confirm()
  {
    this.confirm.emit(this.folderNameInput.nativeElement.value);
    // this.folderNameInput.nativeElement.value = "";
  }


}
