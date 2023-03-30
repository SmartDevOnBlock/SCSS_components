import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer: React.FC = () => {
  const renderSocial = (
    <div className="footer__social">
      <span className="footer__social-label">Join us on</span>
      <ul>
        <li>
          <a href="https://t.me/hotcams_official" target="_blank">
            <img src={require('assets/images/telega.svg')} alt="" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/hotcams_token" target="_blank">
            <img src={require('assets/images/twitter.svg')} alt="" />
          </a>
        </li>
      </ul>
    </div>
  )

  const renderSupport = (
    <div className="footer__list">
      <span className="footer__subtitle">Get in touch</span>
      <ul className="footer__nav footer__nav--mail">
        <li>
          <a href="mailto:support@hotcamstoken.com">support@hotcamstoken.com</a>
        </li>
      </ul>
    </div>
  )

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__information">
            <div className="footer__info">
              <Link to="/" className="footer__logo">
                <img src={require('assets/images/footer-logo.png')} alt="" />
              </Link>
              <MediaQuery minWidth={991}>{renderSocial}</MediaQuery>
            </div>
            <div className="footer__content">
              <div className="footer__list">
                <span className="footer__subtitle">Hot Cams</span>
                <ul className="footer__nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/stream">Streams</Link>
                  </li>
                  <li>
                    <Link to="/">White Paper</Link>
                  </li>
                </ul>
              </div>
              <MediaQuery minWidth={991}>{renderSupport}</MediaQuery>
              <div className="footer__list">
                <span className="footer__subtitle">Quick links</span>
                <ul className="footer__nav">
                  <li>
                    <a href="#">BSC contract</a>
                  </li>
                  <li>
                    <a href="#">Buy on pancakeswap</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <MediaQuery maxWidth={991}>
            <div className="footer__mobile">
              {renderSupport}
              {renderSocial}
            </div>
          </MediaQuery>
        </div>
      </div>
    </div>
  )
}

export default Footer
