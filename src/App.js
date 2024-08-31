import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";

import { auth } from "./firebase";
import Midsem from "./components/Midsem/Midsem";
import Endsem from "./components/Endsem/Endsem";
import Emergency from "./components/Emergency/Emergency";
import Regular from "./components/Regular/Regular";
import Holiday from "./components/Holiday/Holiday";

function Layout({ children }) {
  return (
    <div>
      {/* Common header or navigation for your app */}
      <div className="main-content">
        {children} {/* Content from nested routes */}
      </div>
    </div>
  );
}

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId("");
        setUserName("");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Router basename="/decibell">
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route 
            path="/Home/*" 
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Home />
                </Layout>
              </AuthenticatedRoute>
            }
          >
            <Route path="Midsem" element={<Midsem />} />
            <Route path="Endsem" element={<Endsem />} />
            <Route path="Emergency" element={<Emergency />} />
            <Route path="Holiday" element={<Holiday />} />
            <Route path="Regular" element={<Regular />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function AuthenticatedRoute({ children }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });

    return unsubscribe;
  }, []);

  return userId ? children : <Navigate to="/Login" />;
}

export default App;
