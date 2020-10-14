import {ActionReducer} from '@ngrx/store';
import Cookies from "js-cookie";

import {ADD_NOTE} from './notes.actions'

let notesList = Cookies.getJSON('ngrx-notes');

export const initialNotesData = {
  notesList: notesList ? notesList : []
};

export const notesReducer: ActionReducer<any> = (state = initialNotesData, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      let notesList = [...state.notesList];
      // @ts-ignore
      notesList.push(action.note);
      notesList.shift();
      Cookies.set('ngrx-notes', notesList, { expires: 3 })
      state = Object.assign({}, state, {notesList});
      return state
    }
    default:
      return state
  }
}
