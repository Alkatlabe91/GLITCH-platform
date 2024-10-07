import React from 'react';
import { View, TouchableOpacity, Linking, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { URL } from '../../constent.js';

const SocialMediaShare = ({ defaultTitle }) => {
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`;
    Linking.openURL(url);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(defaultTitle)}`;
    Linking.openURL(url);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(URL)}&title=${encodeURIComponent(defaultTitle)}`;
    Linking.openURL(url);
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(defaultTitle + " " + URL)}`;
    Linking.openURL(url);
  };

  return (
    <View className="flex space-x-4 flex-row justify-center">
      <TouchableOpacity onPress={shareToFacebook} className="text-blue-600 hover:text-blue-800 transition-colors" aria-label="Share on Facebook">
        <FontAwesome name="facebook" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareToTwitter} className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Share on Twitter">
        <FontAwesome name="twitter" size={30} color="skyblue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareToLinkedIn} className="text-blue-700 hover:text-blue-900 transition-colors" aria-label="Share on LinkedIn">
        <FontAwesome name="linkedin" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareToWhatsApp} className="text-green-500 hover:text-green-700 transition-colors" aria-label="Share on WhatsApp">
        <FontAwesome name="whatsapp" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default SocialMediaShare;
