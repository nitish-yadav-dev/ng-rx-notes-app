import {Component, OnInit, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addNote} from './store/notes.actions';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  index: any;
  text: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  animal: string;
  name: string;

  ngOnInit() {
    this.handleNotesVisibility('all');
  }

  notes$: Observable<number>

  constructor(private store: Store<{ notes: any }>, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    // TODO: This stream will connect to the current store `notes` state
    this.notes$ = store.select('notes');
  }

  title = 'NgRx-Notes-App';
  isChalkboardInUse: boolean = false
  noteEditor: any;
  notesList: any = [];
  filteredNotesList: any;

  createNote(noteBadge) {
    if (this.noteEditor === undefined || this.noteEditor.trim() === '') {
      return
    }
    this.isChalkboardInUse = !this.isChalkboardInUse
    let note = {text: this.noteEditor, time: new Date(), noteBadge};
    this.store.dispatch(addNote(note));
    this.notes$.subscribe(e => {
      console.log('e', e);
      // @ts-ignore
      this.notesList = e.notesList
      this.noteEditor = '';
      this.showSnackBar('Note Added', 'UNDO');
    })
  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getFormattedDate(date) {
    const months = ['Jan', 'Fab', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let d = new Date(date);
    let monthName = months[d.getMonth()];
    let year = d.getFullYear();
    return monthName + ' ' + d.getDate() + ' ' + year
  }

  handleNotesVisibility(visibleNotesType: any) {
    this.notes$.subscribe(e => {
      console.log('e', e);
      // @ts-ignore
      this.notesList = e.notesList
      if (visibleNotesType === 'all') {
        this.filteredNotesList = this.notesList
      } else {
        this.filteredNotesList = this.notesList.filter(e => {
          return e.noteBadge === visibleNotesType
        })
      }
    })
  }

  openDialog(text, index): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {text, index}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog implements OnInit {

  ngOnInit() {
    console.log(this.data);
  }
  noteEditor: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  updateNote(noteBadge: string) {
    let obj = {
      text: this.data.text,
      noteBadge,
      time: new Date(),
      index: this.data.index
    }
    this.dialogRef.close(obj);
  }
}
