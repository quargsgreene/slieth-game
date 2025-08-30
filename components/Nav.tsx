import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <nav>
        <Link href="/About">About</Link>
        <Link href="/NewGame">Start New Game</Link>
        <Link href="/ContinueGame">Continue Game</Link>
        <Link href="/">Home</Link>
    </nav>
  );
}