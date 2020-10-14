import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addNote} from './store/notes.actions';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  ngOnInit() {
    this.handleNotesVisibility('all');
  }

  notes$: Observable<number>

  constructor(private store: Store<{ notes: any }>, private _snackBar: MatSnackBar) {
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
}
