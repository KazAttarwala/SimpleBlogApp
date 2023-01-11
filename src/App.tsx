import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ArticlesListPage } from './pages/ArticlesListPage';
import { ArticlePage } from './pages/ArticlePage';
import { NotFoundPage } from './pages/NotFoundPage';
import Navbar from './pages/Navbar';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import useUser from './hooks/useUser';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {user, isLoading} = useUser();
  return (
    <BrowserRouter>
     <div className="App">
      <Navbar />
      <div id="page-body">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <HomePage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
