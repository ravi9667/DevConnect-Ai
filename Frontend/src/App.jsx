import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/landingPage'
import Signup from './features/auth/signup/signup';
import Login from './features/auth/login/login';
import SignupSuccess from './features/auth/signup/components/SignupSuccess/SignupSuccess';
import VerifyEmail from './features/auth/signup/components/VerifyEmail/VerifyEmail';
import Desktop from './features/auth/desktop';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup-success' element={<SignupSuccess />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/desktop' element={<Desktop />} />
        </Routes>
    )
}

export default App;