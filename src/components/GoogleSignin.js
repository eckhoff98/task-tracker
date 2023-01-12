import { getSuggestedQuery } from "@testing-library/react";
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, signInWithCustomToken } from "firebase/auth";
import { auth, provider } from "../firebase-config"



export default function GoogleSignin({ addFirestoreUser, setAlert }) {

    const signin = () => {
        signInWithRedirect(auth, provider);
    }

    const create = async () => {
        try {
            const result = await getRedirectResult(auth)
            if (!result) return
            const user = result.user;
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const extraInfo = {
                name: user.displayName
            }
            const firestoreUser = await addFirestoreUser(user, extraInfo)
            // if (firestoreUser !== null) signOut(auth)
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(errorMessage)
            setAlert({ message: errorMessage, variant: "danger" })
            const credential = GoogleAuthProvider.credentialFromError(err);
        }
    }
    create()

    // getRedirectResult(auth)
    //     .then((result) => {
    //         if (!result) return

    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         const extraInfo = {
    //             name: user.displayName
    //         }
    //         addFirestoreUser(user, extraInfo)
    //     })
    //     .then(() => {
    //         signOut(auth)

    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorMessage)
    //         setAlert({ message: errorMessage, variant: "danger" })
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //     });

    return (
        <>
            <button className="btn btn-secondary btn-lg" style={{ backgroundColor: "White", color: "black" }} onClick={() => signin()}>Google</button>
        </>
    )
}