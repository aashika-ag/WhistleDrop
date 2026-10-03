import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ReportPage from "./pages/ReportPage";
import TrackPage from "./pages/TrackPage";
import ModeratorPage from "./pages/ModeratorPage";

import Navbar from "./components/Navbar";
import SettingsPanel from "./components/SettingsPanel";
import MouseTrail from "./components/MouseTrail";
import BackgroundStreaks from "./components/BackgroundStreaks";

function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <BrowserRouter>
            <BackgroundStreaks />
            <MouseTrail />

            <Navbar
                onSettingsClick={() =>
                    setSettingsOpen(true)
                }
            />

            {settingsOpen && (
                <SettingsPanel
                    onClose={() =>
                        setSettingsOpen(false)
                    }
                />
            )}

            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/track" element={<TrackPage />} />
                    <Route path="/moderator" element={<ModeratorPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;