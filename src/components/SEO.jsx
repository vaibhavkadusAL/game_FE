import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "YONO Games - Play & Download Yono Games Online", 
  description = "Play and download the latest YONO games. Discover premium gaming reviews, features, gameplay information, and updates on our blog.", 
  keywords = "Yono Games, Yono Rummy, Yono Store, download yono games, yono app", 
  image = "/assets/hero.png", 
  slug = ""
}) => {
  
  const siteUrl = "https://yonostoreapp.com"; // Default base URL matching production references
  const currentUrl = slug ? `${siteUrl}/${slug}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const displayTitle = title.includes("YONO Games") ? title : `${title} | YONO Games`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Search Engine Robots */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="YONO Games" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Mobile Optimization Header elements are loaded in index.html, but we enforce them */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;
