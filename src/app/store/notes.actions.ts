export const ADD_NOTE = 'ADD_NOTE';

export const addNote = ( note: { text: any; time: Date; noteBadge: any; } ) => ( {
  type: ADD_NOTE,
  note,
});
