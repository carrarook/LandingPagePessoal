import React from 'react';
import './HeroSection.css';
import background from './mapa.svg';

const HeroSection: React.FC = () => {
    return (
        <section className= "hero" style = {{ backgroundImage: `url(${background})` }
}>
    <div className="overlay" >
        <h1>Bruno < br /> Carraro < /h1>
        < h2 > Fullstack < br /> Developer < /h2>
        <h3>.NET < br /> React < /h3>
        < div className = "arrow" >⌄</div>
            < /div>
            < /section>
  );
}

export default HeroSection;