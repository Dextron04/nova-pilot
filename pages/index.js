import React from 'react';
import styles from '../styles/index.module.css'
import Link from 'next/link';

const Home = () => {
    return (
        <div className={styles.bg}>
            <h1 className={styles.heading}>Welcome to Nova Pilot 🚀</h1>
            <p>Launch your journey in stocks</p>
            <Link href="/stocks">Stocks</Link>
        </div>
    );
}

export default Home;
