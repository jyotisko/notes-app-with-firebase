import { COLLECTION_NAME } from './config.js';

// export const readNotesByUser = user => {
//   const data = db.collection(COLLECTION_NAME).where('user', '==', user).get().then(snapshot => snapshot.docs.map(doc => {
//     const user = doc.data().user;
//     const note = doc.data().note;
//     const id = doc.id;
//     console.log(id);
//     return {
//       user: user,
//       note: note,
//       id: id
//     }
//   }));
//   return data;
// }

export const addData = (user, note) => {
  db.collection(COLLECTION_NAME).add({
    user: user,
    note: note,
  });
}

export const deleteData = id => {
  db.collection(COLLECTION_NAME).doc(id).delete();
}

export const handleDBEvents = (user, addedHandler, removedHandler) => db.collection(COLLECTION_NAME).where('user', '==', user).onSnapshot(snapshot => {
  const changes = snapshot.docChanges();
  if (changes.length === 0) return;
  changes.forEach(change => {
    if (change.type === 'added') {
      const id = change.doc.id;
      const user = change.doc.data().user;
      const note = change.doc.data().note;
      addedHandler(id, user, note);
    }
    if (change.type === 'removed') {
      removedHandler(change.doc.id)
    }
  });
});
