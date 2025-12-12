// QR Code Templates Module
// Generates QR code content for different template types

export const Templates = {
  text: () => document.getElementById('text-content').value || 'https://github.com',

  wifi: () => {
    const ssid = document.getElementById('wifi-ssid').value || 'WiFi';
    const pass = document.getElementById('wifi-password').value;
    const enc = document.getElementById('wifi-encryption').value;
    const hidden = document.getElementById('wifi-hidden').checked;
    
    let s = `WIFI:T:${enc};S:${ssid};`;
    if (pass && enc !== 'nopass') s += `P:${pass};`;
    if (hidden) s += 'H:true;';
    return s + ';';
  },

  vcard: () => {
    const name = document.getElementById('vcard-name').value || 'John Doe';
    const parts = name.split(' ');
    const last = parts.length > 1 ? parts.pop() : '';
    const first = parts.join(' ') || name;
    
    let v = `BEGIN:VCARD\nVERSION:3.0\nN:${last};${first};;;\nFN:${name}\n`;
    if (document.getElementById('vcard-org').value) v += `ORG:${document.getElementById('vcard-org').value}\n`;
    if (document.getElementById('vcard-title').value) v += `TITLE:${document.getElementById('vcard-title').value}\n`;
    if (document.getElementById('vcard-phone').value) v += `TEL:${document.getElementById('vcard-phone').value}\n`;
    if (document.getElementById('vcard-email').value) v += `EMAIL:${document.getElementById('vcard-email').value}\n`;
    if (document.getElementById('vcard-url').value) v += `URL:${document.getElementById('vcard-url').value}\n`;
    if (document.getElementById('vcard-address').value) v += `ADR:;;${document.getElementById('vcard-address').value};;;;\n`;
    return v + 'END:VCARD';
  },

  mecard: () => {
    const fields = [];
    if (document.getElementById('mecard-name').value) fields.push(`N:${document.getElementById('mecard-name').value}`);
    if (document.getElementById('mecard-phone').value) fields.push(`TEL:${document.getElementById('mecard-phone').value}`);
    if (document.getElementById('mecard-email').value) fields.push(`EMAIL:${document.getElementById('mecard-email').value}`);
    if (document.getElementById('mecard-url').value) fields.push(`URL:${document.getElementById('mecard-url').value}`);
    if (document.getElementById('mecard-address').value) fields.push(`ADR:${document.getElementById('mecard-address').value}`);
    if (document.getElementById('mecard-birthday').value) fields.push(`BDAY:${document.getElementById('mecard-birthday').value}`);
    if (document.getElementById('mecard-note').value) fields.push(`NOTE:${document.getElementById('mecard-note').value}`);
    return 'MECARD:' + fields.join(';') + ';';
  },

  event: () => {
    const title = document.getElementById('event-title').value || 'Event';
    const start = document.getElementById('event-start').value;
    const end = document.getElementById('event-end').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;
    const timezone = document.getElementById('event-timezone').value;
    
    let v = `BEGIN:VEVENT\nSUMMARY:${title}\n`;
    if (start) v += `DTSTART:${formatDate(new Date(start), timezone)}\n`;
    if (end) v += `DTEND:${formatDate(new Date(end), timezone)}\n`;
    if (location) v += `LOCATION:${location}\n`;
    if (description) v += `DESCRIPTION:${description}\n`;
    return v + 'END:VEVENT';
  },

  bitcoin: () => {
    const address = document.getElementById('bitcoin-address').value;
    const amount = document.getElementById('bitcoin-amount').value;
    const label = document.getElementById('bitcoin-label').value;
    const message = document.getElementById('bitcoin-message').value;
    
    let uri = 'bitcoin:';
    if (address) uri += address;
    const params = [];
    if (amount) params.push(`amount=${amount}`);
    if (label) params.push(`label=${encodeURIComponent(label)}`);
    if (message) params.push(`message=${encodeURIComponent(message)}`);
    return params.length ? uri + '?' + params.join('&') : uri;
  },

  geo: () => {
    const lat = document.getElementById('geo-latitude').value;
    const lng = document.getElementById('geo-longitude').value;
    const alt = document.getElementById('geo-altitude').value;
    const query = document.getElementById('geo-query').value;
    
    if (!lat || !lng) return 'geo:0,0';
    let uri = `geo:${lat},${lng}`;
    if (alt) uri += `,${alt}`;
    if (query) uri += `?q=${encodeURIComponent(query)}`;
    return uri;
  },

  social: () => {
    const platform = document.getElementById('social-platform').value;
    const username = document.getElementById('social-username').value;
    
    if (platform === 'custom') return username || 'https://example.com';
    
    const urls = {
      facebook: `https://facebook.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      instagram: `https://instagram.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      youtube: `https://youtube.com/@${username}`,
      tiktok: `https://tiktok.com/@${username}`,
      github: `https://github.com/${username}`
    };
    return urls[platform] || `https://${platform}.com/${username}`;
  },

  app: () => {
    const platform = document.getElementById('app-platform').value;
    const appId = document.getElementById('app-id').value;
    
    if (platform === 'custom') return appId || 'https://example.com/app';
    
    const urls = {
      ios: `https://apps.apple.com/app/id${appId}`,
      android: `https://play.google.com/store/apps/details?id=${appId}`,
      windows: `https://www.microsoft.com/store/apps/${appId}`,
      amazon: `https://www.amazon.com/gp/product/${appId}`
    };
    return urls[platform] || `https://store.${platform}.com/app/${appId}`;
  },

  email: () => {
    const to = document.getElementById('email-to').value || 'test@example.com';
    let m = `mailto:${to}`;
    const p = [];
    if (document.getElementById('email-subject').value) p.push(`subject=${encodeURIComponent(document.getElementById('email-subject').value)}`);
    if (document.getElementById('email-body').value) p.push(`body=${encodeURIComponent(document.getElementById('email-body').value)}`);
    return p.length ? m + '?' + p.join('&') : m;
  },

  sms: () => {
    const phone = document.getElementById('sms-phone').value || '+1234567890';
    const message = document.getElementById('sms-message').value;
    return message ? `sms:${phone}?body=${encodeURIComponent(message)}` : `sms:${phone}`;
  },

  phone: () => `tel:${document.getElementById('phone-number').value || '+1234567890'}`
};

function formatDate(date, timezone) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function getContent() {
  const template = document.querySelector('.template-btn.active').dataset.template;
  return Templates[template] ? Templates[template]() : 'https://github.com';
}