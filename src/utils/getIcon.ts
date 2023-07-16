import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaTumblr,
  FaFacebook,
  FaPinterest,
  FaSignInAlt
} from "react-icons/fa";
import { IconType } from "react-icons";

interface ISocialMediaProperty {
  [key: string]: IconType;
}

export function getSocialMediaIcon (name: string): IconType {
  const icons: ISocialMediaProperty = {
    "youtube": FaYoutube,
    "instagram": FaInstagram,
    "twitter": FaTwitter,
    "tumblr": FaTumblr,
    "facebook": FaFacebook,
    "pinterest": FaPinterest
  };
  if (icons[name] === undefined) return FaSignInAlt;
  return icons[name];
}
