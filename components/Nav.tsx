import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <nav>
        <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/About">About</Link>
                </li>
                <li>
                    <Link href="/NewGame">Start New Game</Link>
                </li>
                <li>
                    <Link href="/ContinueGame">Continue Game</Link>
                </li>
        </ul>       
    </nav>
  );
}