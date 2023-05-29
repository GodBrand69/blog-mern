import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./components/CreatePost";
import PostPage from "./PostPage";
import PostDesc from "./PostDesc";
import EditPost from "./components/EditPost";

function App() {
  return (
    <>
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDesc />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </UserContextProvider>
    </>
  );
}

export default App;
