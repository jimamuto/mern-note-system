import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">MERN Notes</h6>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Features</a>
        <a className="link link-hover">Documentation</a>
      </nav>
      <nav>
        <h6 className="footer-title">Support</h6>
        <a className="link link-hover">Help Center</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">API Status</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer