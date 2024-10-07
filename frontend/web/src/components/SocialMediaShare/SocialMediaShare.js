import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { URL } from '../../constent';

const SocialMediaShare = ({defaultTitle }) => {
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(defaultTitle)}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(URL)}&title=${encodeURIComponent(defaultTitle)}`;
    window.open(url, '_blank');
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(defaultTitle + " " + URL)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={shareToFacebook} 
        className="text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={30} />
      </button>
      <button 
        onClick={shareToTwitter} 
        className="text-blue-400 hover:text-blue-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={30} />
      </button>
      <button 
        onClick={shareToLinkedIn} 
        className="text-blue-700 hover:text-blue-900 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={30} />
      </button>
      <button 
        onClick={shareToWhatsApp} 
        className="text-green-500 hover:text-green-700 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </button>
    </div>
  );
};

export default SocialMediaShare;
