import { useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import visibleStateSlice, {
  closeProfileWindow,
} from "./features/visibleStateSlice";
import { Route, Routes } from "react-router-dom";
import Main from "./screens/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import InfoPopup from "./components/InfoPopup";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, loign } from "./features/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteLoggedIn from "./components/ProtectedRouteLoggedIn";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

function App() {
  const { isLoadingBarVisible } = useSelector((state) => state.visibleState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const docSnap = await getDoc(doc(db, "users", id));
        if (docSnap.exists()) {
          const userData = docSnap.data();
          return userData;
        } else {
          throw new Error("Cant fetch user from firestore users collection");
        }
      } catch (error) {
        alert(error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { email, photoURL, uid } = user;
        fetchUserData(uid).then((userData) => {
          dispatch(
            login({
              username: userData.username,
              about: userData.about,
              email,
              photoURL,
              id: uid,
            })
          );
        });
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);
  return (
    <div
      className="grid h-screen w-screen
     bg-zinc-800
    text-white
    md:grid-cols-[minmax(250px,_400px)_1fr]
    2xl:grid-cols-[minmax(200px,_500px)_1fr]
    "
    >
      {isLoadingBarVisible && (
        <div
          className="fixed top-0
      w-screen h-[7px]
      bg-emerald-700
      animate-grow
      "
        ></div>
      )}
      <InfoPopup />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteLoggedIn>
              <Login />
            </ProtectedRouteLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteLoggedIn>
              <Register />
            </ProtectedRouteLoggedIn>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
