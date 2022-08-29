import { Route, Routes } from "react-router-dom";
import EventPage from "./Pages/EventPage";
import Home from "./Pages/Home";
import Verify from "./Pages/Verify";
import Policy from "./Pages/Policy";
import TosPage from "./Pages/TosPage";
import AboutUsPage from "./Pages/AboutUsPage";
import SettingPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage";
import PageNotFound from "./Pages/PageNotFound";
//import ProtectedRoutes from "./Components/ProtectedRoutes";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles["*"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/tos" element={<TosPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />}  />
          <Route path="/events/:location" element={<EventPage />} />
          <Route path="*" element={<PageNotFound />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
