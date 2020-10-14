export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const addNote = ( note: { text: any; time: Date; noteBadge: any; } ) => ( {
  type: ADD_NOTE,
  note,
});

export const updateNote = ( note: any ) => ( {
  type: UPDATE_NOTE,
  note,
});

export const deleteNote = ( index: any ) => ( {
  type: DELETE_NOTE,
  index,
});
