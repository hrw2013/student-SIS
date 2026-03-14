const firebaseConfig = {
    apiKey: "AIzaSyAm1XOq0aTmSf9OUFjDb1VLJzY2y38R46o",
    authDomain: "sis-thing.firebaseapp.com",
    projectId: "sis-thing",
    storageBucket: "sis-thing.firebasestorage.app",
    messagingSenderId: "270031894804",
    appId: "1:270031894804:web:f45050dc34b67a81bfea01"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
