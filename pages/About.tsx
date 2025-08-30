import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Slieth is an interactive set of instructions on the internet.</p>
      <br/>
      <p>In particular, the aforementioned set of instructions encourages one to think about the art of internal sensations.</p>
      <br/>
      <p>The decisions you make with your appendages will determine how you engage with thoughts of entrails.</p>
      <br/>
      <p>Have a click around.</p>
      <img src="/public/slieth.png" alt="Slieth Logo" style={{ width: '1em', height: '1em' }} />
      <Link href="/">Home</Link>
    </div>
  );
}

export default About;
