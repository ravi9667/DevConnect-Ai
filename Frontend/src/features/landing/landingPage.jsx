import { useState } from 'react';
import Intro from './components/Intro/Intro';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ValueSection from './components/ValueSection/ValueSection';
import HowItWorks from './components/HowItWorks/HowItworks';
import AiSection from './components/AiSection/AiSection';
import CommunitySection from './components/CommunitySection/CommunitySection';
import ProjectSection from './components/ProjectSection/ProjectSection';
import FinalCTA from './components/FinalCTA/FinalCTA';
import './landingPage.scss';

const LandingPage = () => {
    const [introComplete, setIntroComplete] = useState(false);
    const [ heroComplete, setHeroComplete ] = useState(false);

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Intro onComplete={() => setIntroComplete(true)} />
            <Hero introComplete={introComplete} onComplete={() => setHeroComplete(true)} />
            <Navbar heroComplete={heroComplete} /> 
            <ValueSection />
            <HowItWorks />
            <AiSection />
            <CommunitySection />
            <ProjectSection />
            <FinalCTA />
        </main>
    )
}

export default LandingPage;