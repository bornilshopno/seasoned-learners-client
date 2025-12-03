import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import AuthContext from './AuthContext';
import app from './firebase.config';



const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(null);

  

    // const axiosPublic = useAxiosPublic()
    //firebase lookup
    useEffect(() => {
        setUserLoading(true);
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserLoading(false)
        })


        return (() => unSubscribe())
    }, [auth])


    //    useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(true)

    //         if(currentUser?.email){
    //             const user={email: currentUser.email};
    //             axiosSecure.post("/jwt" ,user, {withCredentials:true})
    //             .then(res=> {
    //                 setLoading(false)
    //             })
    //         }
    //         else{
    //             axiosSecure.post("/logout" ,{})

    //             .then(res=> {console.log(res.data);
    //                 setLoading(false)
    //             })
    //             .catch(error => {
    //                 console.error('Error during logout:', error);
    //             });
    //         }

    //     })

    //     return () => unSubscribe();
    // }, [auth])


    //user registration
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //user login
    const userLogIn = (email, password) => {
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //userlogout
    const userLogOut = () => {
        setUserLoading(true);
        return signOut(auth)
    }


    //profile update on firebase
    const updateUserProfile = (name, photo) => {

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    //update password

    const resetPassword = async (resetEmail) => {
        console.log("reached providers")
        try {
            setUserLoading(true);
            console.log("User loading at reset")
            await sendPasswordResetEmail(auth, resetEmail);
            console.log("Password reset email sent!");
        } catch (error) {
            console.error("Reset error:", error);
            throw error;
        } finally {
            setUserLoading(false);
        }
    };




    const authDetails = { user,  setUser, userLoading, setUserLoading, createUser, userLogIn, userLogOut, updateUserProfile, resetPassword }

    return (
        <AuthContext.Provider value={authDetails}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;