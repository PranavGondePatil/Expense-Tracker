import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCucQHY1f6OAOHEm-BYPcbFIIkqswHRrnM",
    authDomain: "expense-manager-b8468.firebaseapp.com",
    databaseURL: "https://expense-manager-b8468-default-rtdb.firebaseio.com/",
    projectId: "expense-manager-b8468",
    storageBucket: "expense-manager-b8468.appspot.com",
    messagingSenderId: "616452894089",
    appId: "1:616452894089:web:51fc6d19fd084ed7620558",
    measurementId: "G-W1JZ2QVGRP"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
