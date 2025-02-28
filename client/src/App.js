import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <>
    <Navbar />
    <Layout>
      <Routes>
        <Route path="/" element={<AddRecipePage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipe/:id" element={<RecipeDetailPage />} />
        <Route path=":id/edit" element={<EditRecipePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

    </Layout>
    <ToastContainer position='bottom-right' />

    </>
  );
}

export default App;
