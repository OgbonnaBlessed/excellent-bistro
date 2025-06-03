import React from 'react'
import { navLinks, styles } from '../assets/dummyadmin'
import { GiChefToque } from 'react-icons/gi'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles.navWrapper}>
            <div className={styles.navContainer}>
                <div className={styles.logoSection}>
                    <GiChefToque className={styles.logoIcon} />
                    <span className={styles.logoText}>Admin Panel</span>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={styles.menuButton}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <div className={styles.desktopMenu}>
                    {navLinks}
                </div>
            </div>
        </div>
    )
}

export default Navbar