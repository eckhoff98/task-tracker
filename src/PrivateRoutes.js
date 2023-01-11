import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./firebase-config";

export default function PrivateRoutes({ user, navLocation, reverse = false }) {

    if (reverse) {
        return !user ? <Outlet /> : <Navigate to={navLocation} />
    } else {
        return user ? <Outlet /> : <Navigate to={navLocation} />
    }

}