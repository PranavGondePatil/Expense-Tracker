import { auth } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => {
    return auth.signOut()
        .then(() => {
            console.log("User signed out successfully");
        })
        .catch((error) => {
            console.error("Sign out error:", error);
        });
};

// Password Reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);
