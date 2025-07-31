import "./App.css";
import Blogs from "./components/Blog/Blogs"
import Contact from "./components/Blog Forms/Contact";
import Footer from "./components/Layout/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Sections/Home";
import Register from "./components/Auth Forms/Register";
import Login from "./components/Auth Forms/Login";
import ContactForm from "./components/Blog Forms/ContactForm";
import BlogArticle from "./components/Blog/BlogArticle";
import Profile from "./components/Sections/Profile";
import ScrollToTop from "./components/Utils/ScrollToTop";
import CreateBlogForm from "./components/Blog Forms/CreateBlogForm";
import DeleteSuccessful from "./components/Action Response/DeleteSuccessful";
import EditBlogForm from "./components/Blog Forms/EditBlogForm";
import SuccessfulBlogEdit from "./components/Action Response/SuccessfulBlogEdit";
import LoginSuccess from "./components/Action Response/LoginSuccess";


function App() {

  return (
    <Router>
      <  ScrollToTop />
      <div className="titillium-web-regular">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/login-true" element={<LoginSuccess />} />
          <Route path="/profile"  >
            <Route path="" element={<Profile />} />
            <Route path="deleted" element={<DeleteSuccessful />} />
            <Route path="edit" element={<EditBlogForm />} />
            <Route path="edited" element={<SuccessfulBlogEdit />} />
          </Route>
          <Route path="/create-blog" element={<CreateBlogForm />} />
          <Route path="/blog">
            <Route path=":id" element={<BlogArticle />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
