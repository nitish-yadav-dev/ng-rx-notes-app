import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {addNote} from './store/notes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  ngOnInit() {
    this.notes$.subscribe(e => {
      console.log('e', e);
      // @ts-ignore
      this.notesList = e.notesList
    })
  }

  notes$: Observable<number>

  constructor(private store: Store<{ notes: any }>, ) {
    // TODO: This stream will connect to the current store `notes` state
    this.notes$ = store.select('notes');
  }
  title = 'NgRx-Notes-App';
  isChalkboardInUse: boolean = false
  noteEditor: any;
  notesList: any = [];

  createNote(noteBadge) {
    this.isChalkboardInUse = !this.isChalkboardInUse
    let note = {text: this.noteEditor, time: new Date(), noteBadge};
    this.store.dispatch(addNote(note));
    this.notes$.subscribe(e => {
      console.log('e', e);
      // @ts-ignore
      this.notesList = e.notesList
    })
  }

  getFormattedDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Fab', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let d = new Date(date);
    let dayName = days[d.getDay()];
    let monthName = months[d.getMonth()];
    let year = d.getFullYear();
    return monthName + ' ' + dayName + ' ' + year
  }
}
