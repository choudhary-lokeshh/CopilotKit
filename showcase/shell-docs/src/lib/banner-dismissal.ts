// Announcement-banner dismissal state, shared by the Banners client component
// and the inline script in the root layout that applies it before first paint.
//
// Dismissal lives in localStorage, which the server can't read, so the server
// always renders the banner. The inline script marks <html> with
// BANNER_DISMISSED_ATTRIBUTE before the body is parsed, and globals.css keys
// both the banner's visibility and --fd-banner-height off that attribute, so
// the first paint already has the final layout. fumadocs-ui's own Banner uses
// the same approach.

export const BANNER_REAPPEAR_DELAY = 3 * 24 * 60 * 60 * 1000;
export const BANNER_DISMISSED_KEY = "nd-banner-rotating-banner";
export const BANNER_DISMISSED_TIME_KEY =
  "nd-banner-rotating-banner-dismissed-at";
export const LEGACY_DISMISSED_STORAGE_KEY =
  "shell-docs-course-banner-dismissed";
export const BANNER_DISMISSED_ATTRIBUTE = "data-banner-dismissed";

// Read-only version of checkBannerExpiry in banners.tsx: dismissed when either
// flag is set, unless the dismissal is older than BANNER_REAPPEAR_DELAY. The
// component still owns stamping a missing timestamp and clearing expired keys.
export const BANNER_INIT_SCRIPT = `(function(){try{var s=localStorage;if(s.getItem(${JSON.stringify(BANNER_DISMISSED_KEY)})!=="true"&&s.getItem(${JSON.stringify(LEGACY_DISMISSED_STORAGE_KEY)})!=="true")return;var t=s.getItem(${JSON.stringify(BANNER_DISMISSED_TIME_KEY)});if(t&&Date.now()-parseInt(t,10)>=${BANNER_REAPPEAR_DELAY})return;document.documentElement.setAttribute(${JSON.stringify(BANNER_DISMISSED_ATTRIBUTE)},"");}catch(e){}})();`;
