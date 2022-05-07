import {useLocation, BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {useEffect} from "react";
import './App.css';
import Main from "./routes/Main";
import {ConversationProvider} from "./context/ConversationContext";

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const PrivateRoute = ({component: RouteComponent}) => {
  const isAuthenticated = localStorage.getItem('club-at');

  if (isAuthenticated) {
    return <RouteComponent/>
  }
  return <Navigate to="/"/>
}

export const LoginRoute = ({component: RouteComponent}) => {
  const isAuthenticated = localStorage.getItem('club-at');

  if (!isAuthenticated) {
    return <RouteComponent/>
  }
  return <Navigate to="/home"/>
}

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <ConversationProvider>
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<LoginRoute component={Main}/>}/>
        </Routes>
      </Router>
    </div>
    </ConversationProvider>
  );
}

export default App;
