import React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('footerCopyright')}</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">{t('facebook')}</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">{t('twitter')}</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">{t('instagram')}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;