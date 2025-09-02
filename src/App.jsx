import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home";
import Events from "./components/Events";
import EventDetails from "./pages/EventDetails";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import * as Tone from "tone";

function App() {
  useEffect(() => {
    const unlock = async () => await Tone.start();
    window.addEventListener("click", unlock, { once: true });

    return () => window.removeEventListener("click", unlock);
  }, []);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:event_id" element={<EventDetails />} />
        <Route path="/registration/:event_id" element={<Registration />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
