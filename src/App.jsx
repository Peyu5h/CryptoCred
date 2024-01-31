import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import VerifyPage from "./pages/VerifyPage";

const App = () => {
  return (
    <div className="p-10 font-hind">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/upload" element={<UploadPage />}></Route>
        <Route path="/verify" element={<VerifyPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
