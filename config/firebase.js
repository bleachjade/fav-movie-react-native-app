import * as firebase from "firebase";
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.manifest.extra.firebaseApiKey,
    authDomain: Constants.manifest.extra.firebaseAuthDomain,
    databaseURL: Constants.manifest.extra.firebaseDatabaseUrl,
    projectId: Constants.manifest.extra.firebaseProjectId,
    storageBucket: Constants.manifest.extra.firebaseStorageBucket,
    messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
    appId: Constants.manifest.extra.firebaseAppId,
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.app().database('https://fav-movie-react-native-app-default-rtdb.asia-southeast1.firebasedatabase.app');
// let ref = firebase.database("https://fav-movie-react-native-app-default-rtdb.asia-southeast1.firebasedatabase.app")

export { auth, db };