import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCbPkrM25orgn2epFQ-dQXNeaW4wk6Kv6A",
    authDomain: "xmas-853bb.firebaseapp.com",
    projectId: "xmas-853bb",
    storageBucket: "xmas-853bb.appspot.com",
    messagingSenderId: "725481960014",
    appId: "1:725481960014:web:9dcae1be8bae455b09891f"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore()


  export const createUserDocument = (user, data) => {
      if(!user){
          return
      }

      const userRef = firestore.doc(`users/${user.localId}`)
      const snapshot = userRef.get()

      if(!snapshot.exist){
          const name = data.name

          try {
              userRef.set({
                  name:name
              })
              
          } catch (error) {
              console.log("error creating user", error);
          }
      }
  }



  export default firebase