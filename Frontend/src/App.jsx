import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/landingPage'
import Signup from './features/auth/signup/signup';
import Login from './features/auth/login/login';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default App;