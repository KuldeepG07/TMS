import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2025 Teacher Management System. All rights reserved.</p>
            <ul className="footer-links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
