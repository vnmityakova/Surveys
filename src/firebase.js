import firebase from 'firebase';
/* eslint-disable */
const config = {
  apiKey: 'AIzaSyByIJqnc-2b8wKj2vGptP6yBAD1L5rdYn0',
  authDomain: 'surveys-9c76b.firebaseapp.com',
  databaseURL: 'https://surveys-9c76b.firebaseio.com',
  projectId: 'surveys-9c76b',
  storageBucket: '',
  messagingSenderId: '231183159704',
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
