import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user info (like role) from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          role: 'user', // default role
        };

        if (userDoc.exists()) {
          userData = { ...userData, ...userDoc.data() };
          // Automatically grant admin role to the specified email
          if (firebaseUser.email === 'kmahesh10634@gmail.com') {
            userData.role = 'admin';
            if (userDoc.data().role !== 'admin') {
              await setDoc(userDocRef, { role: 'admin' }, { merge: true });
            }
          }
        } else {
          // If no doc exists for some reason, we can create one
          if (firebaseUser.email === 'kmahesh10634@gmail.com') {
            userData.role = 'admin';
          }
          await setDoc(userDocRef, userData);
        }

        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // User state will be updated by onAuthStateChanged
    return userCredential.user;
  };

  const signup = async (userData) => {
    const { name, email, password } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Create user document in Firestore with role 'user'
    const newUserDoc = {
      id: userCredential.user.uid,
      name: name,
      email: email,
      role: 'user'
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), newUserDoc);
    
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
