import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { CodePage } from './pages/CodePage';
import { FilesPage } from './pages/FilesPage';
import { LinkPage } from './pages/LinkPage';
import { NotesPage } from './pages/NotesPage';
import { ImagePage } from './pages/ImagePage';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { logIn, logOut, setUser } from './appstore/reducers/userSlice';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(logIn());
        dispatch(setUser(user));
      } else {
        dispatch(logOut());
      }
      setLoading(false); // Set loading to false after auth check
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  // If loading, return a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Homepage />}>
        <Route path="signup" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path="signin" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      </Route>

      {/* Protected Routes */}
      {isLoggedIn ? (
        <Route path="/dashboard" element={<Layout />}>
          <Route path="codes" index element={<CodePage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="links" element={<LinkPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="images" element={<ImagePage />} />
          <Route path="logout" element={<button onClick={handleLogout}>Logout</button>} />
        </Route>
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
      )}

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
