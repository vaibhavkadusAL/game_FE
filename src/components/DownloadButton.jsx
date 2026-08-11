import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import './DownloadButton.css';

const DownloadButton = ({ label = "Download APK Now", apkUrl = "#", onClick }) => {
  const handleDownload = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (apkUrl === "#") {
      e.preventDefault();
      alert("Preparing your YONO Games APK download package... Ready! (Mock Download Started)");
      // In production, we'd trigger the actual file download:
      const link = document.createElement('a');
      link.href = 'https://yonostoreapp.com/yono-games.apk'; // placeholder or static asset
      link.setAttribute('download', 'YonoGames.apk');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="download-btn-container">
      <button className="download-btn" onClick={handleDownload}>
        <ArrowDownCircle />
        <span>{label}</span>
      </button>
      <div className="download-btn-pulse"></div>
    </div>
  );
};

export default DownloadButton;
