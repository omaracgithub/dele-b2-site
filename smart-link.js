// Smart Link — App Store routing + non-iOS detection
(function () {
  'use strict';

  var APP_STORE_URL = 'https://apps.apple.com/app/id6772564355';

  function isIOS() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isMac() {
    return /Macintosh|MacIntel/.test(navigator.userAgent || navigator.platform);
  }

  // Show non-iOS notice
  function showNotice() {
    if (isIOS() || isMac()) return;

    var notice = document.createElement('div');
    notice.id = 'platform-notice';
    notice.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:14px 20px;text-align:center;font-size:0.9rem;z-index:9999;display:flex;align-items:center;justify-content:center;gap:12px;';
    notice.innerHTML = '<span>📱 Esta app está disponible solo para iPhone</span><button onclick="this.parentElement.remove()" style="background:none;border:1px solid rgba(255,255,255,0.3);color:#fff;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;">✕</button>';
    document.body.appendChild(notice);
  }

  // Enhance App Store links
  function enhanceLinks() {
    var links = document.querySelectorAll('a[href*="apps.apple.com"], a[href*="itunes.apple.com"]');
    links.forEach(function (link) {
      // Add target blank for non-iOS
      if (!isIOS()) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      showNotice();
      enhanceLinks();
    });
  } else {
    showNotice();
    enhanceLinks();
  }
})();
