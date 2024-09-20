import React from 'react'
import './GuestFooter.css'
function GuestFooter() {
  return (
    <div>
          <footer className="guest-footer">
      <div className="container">
        <div className="footer-content">
          <div className="company-info">
            <h2>DARKMOON</h2>
            <p>&copy; {new Date().getFullYear()} DARKMOON. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="/about-us">About Us</a>
            <a href="/community-us">Community</a>
            <a href="/contact">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default GuestFooter
