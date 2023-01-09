import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "../firebase-config"



export default function GoogleSignin({ addExtraUserInfo, setErrMsg }) {

    const signin = () => {
        signInWithRedirect(auth, provider);
    }
    getRedirectResult(auth)
        .then((result) => {
            if (!result) return

            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const newUser = {
                uid: user.uid,
                name: user.displayName
            }
            addExtraUserInfo(newUser)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            setErrMsg(errorMessage)
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    useEffect(() => {

    }, [])


    return (
        <>
            <button className="btn btn-secondary btn-lg" style={{ backgroundColor: "White", color: "black" }} onClick={() => signin()}>Google</button>
        </>
    )
}