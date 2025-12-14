// QR Code Templates Module
// Generates QR code content for different template types

export const Templates = {
  text: () => document.getElementById('text-content')?.value || 'https://github.com',

  wifi: () => {
    const ssidEl = document.getElementById('wifi-ssid');
    const passEl = document.getElementById('wifi-password');
    const encEl = document.getElementById('wifi-encryption');
    const hiddenEl = document.getElementById('wifi-hidden');
    
    if (!ssidEl || !encEl) return 'WIFI:T:WPA;S:WiFi;;';
    
    const ssid = ssidEl.value || 'WiFi';
    const pass = passEl ? passEl.value : '';
    const enc = encEl.value;
    const hidden = hiddenEl ? hiddenEl.checked : false;
    
    let s = `WIFI:T:${enc};S:${ssid};`;
    if (pass && enc !== 'nopass') s += `P:${pass};`;
    if (hidden) s += 'H:true;';
    return s + ';';
  },

  vcard: () => {
    const nameEl = document.getElementById('vcard-name');
    if (!nameEl) return 'BEGIN:VCARD\nVERSION:3.0\nN:;John Doe;;;\nFN:John Doe\nEND:VCARD';
    
    const name = nameEl.value || 'John Doe';
    const parts = name.split(' ');
    const last = parts.length > 1 ? parts.pop() : '';
    const first = parts.join(' ') || name;
    
    let v = `BEGIN:VCARD\nVERSION:3.0\nN:${last};${first};;;\nFN:${name}\n`;
    const orgEl = document.getElementById('vcard-org');
    const titleEl = document.getElementById('vcard-title');
    const phoneEl = document.getElementById('vcard-phone');
    const emailEl = document.getElementById('vcard-email');
    const urlEl = document.getElementById('vcard-url');
    const addrEl = document.getElementById('vcard-address');
    
    if (orgEl?.value) v += `ORG:${orgEl.value}\n`;
    if (titleEl?.value) v += `TITLE:${titleEl.value}\n`;
    if (phoneEl?.value) v += `TEL:${phoneEl.value}\n`;
    if (emailEl?.value) v += `EMAIL:${emailEl.value}\n`;
    if (urlEl?.value) v += `URL:${urlEl.value}\n`;
    if (addrEl?.value) v += `ADR:;;${addrEl.value};;;;\n`;
    return v + 'END:VCARD';
  },

  mecard: () => {
    const fields = [];
    const nameEl = document.getElementById('mecard-name');
    const phoneEl = document.getElementById('mecard-phone');
    const emailEl = document.getElementById('mecard-email');
    const urlEl = document.getElementById('mecard-url');
    const addrEl = document.getElementById('mecard-address');
    const bdayEl = document.getElementById('mecard-birthday');
    const noteEl = document.getElementById('mecard-note');
    
    if (nameEl?.value) fields.push(`N:${nameEl.value}`);
    if (phoneEl?.value) fields.push(`TEL:${phoneEl.value}`);
    if (emailEl?.value) fields.push(`EMAIL:${emailEl.value}`);
    if (urlEl?.value) fields.push(`URL:${urlEl.value}`);
    if (addrEl?.value) fields.push(`ADR:${addrEl.value}`);
    if (bdayEl?.value) fields.push(`BDAY:${bdayEl.value}`);
    if (noteEl?.value) fields.push(`NOTE:${noteEl.value}`);
    return 'MECARD:' + fields.join(';') + ';';
  },

  event: () => {
    const titleEl = document.getElementById('event-title');
    const startEl = document.getElementById('event-start');
    const endEl = document.getElementById('event-end');
    const locEl = document.getElementById('event-location');
    const descEl = document.getElementById('event-description');
    const tzEl = document.getElementById('event-timezone');
    
    if (!titleEl) return 'BEGIN:VEVENT\nSUMMARY:Event\nEND:VEVENT';
    
    const title = titleEl.value || 'Event';
    const start = startEl ? startEl.value : '';
    const end = endEl ? endEl.value : '';
    const location = locEl ? locEl.value : '';
    const description = descEl ? descEl.value : '';
    const timezone = tzEl ? tzEl.value : 'UTC';
    
    let v = `BEGIN:VEVENT\nSUMMARY:${title}\n`;
    if (start) v += `DTSTART:${formatDate(new Date(start), timezone)}\n`;
    if (end) v += `DTEND:${formatDate(new Date(end), timezone)}\n`;
    if (location) v += `LOCATION:${location}\n`;
    if (description) v += `DESCRIPTION:${description}\n`;
    return v + 'END:VEVENT';
  },

  bitcoin: () => {
    const addrEl = document.getElementById('bitcoin-address');
    const amtEl = document.getElementById('bitcoin-amount');
    const labelEl = document.getElementById('bitcoin-label');
    const msgEl = document.getElementById('bitcoin-message');
    
    if (!addrEl) return 'bitcoin:';
    
    const address = addrEl.value;
    const amount = amtEl ? amtEl.value : '';
    const label = labelEl ? labelEl.value : '';
    const message = msgEl ? msgEl.value : '';
    
    let uri = 'bitcoin:';
    if (address) uri += address;
    const params = [];
    if (amount) params.push(`amount=${amount}`);
    if (label) params.push(`label=${encodeURIComponent(label)}`);
    if (message) params.push(`message=${encodeURIComponent(message)}`);
    return params.length ? uri + '?' + params.join('&') : uri;
  },

  geo: () => {
    const latEl = document.getElementById('geo-latitude');
    const lngEl = document.getElementById('geo-longitude');
    const altEl = document.getElementById('geo-altitude');
    const queryEl = document.getElementById('geo-query');
    
    if (!latEl || !lngEl) return 'geo:0,0';
    
    const lat = latEl.value;
    const lng = lngEl.value;
    const alt = altEl ? altEl.value : '';
    const query = queryEl ? queryEl.value : '';
    
    if (!lat || !lng) return 'geo:0,0';
    let uri = `geo:${lat},${lng}`;
    if (alt) uri += `,${alt}`;
    if (query) uri += `?q=${encodeURIComponent(query)}`;
    return uri;
  },

  social: () => {
    const platformEl = document.getElementById('social-platform');
    const usernameEl = document.getElementById('social-username');
    
    if (!platformEl || !usernameEl) return 'https://example.com';
    
    const platform = platformEl.value;
    const username = usernameEl.value;
    
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
    const platformEl = document.getElementById('app-platform');
    const appIdEl = document.getElementById('app-id');
    
    if (!platformEl || !appIdEl) return 'https://example.com/app';
    
    const platform = platformEl.value;
    const appId = appIdEl.value;
    
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
    const toEl = document.getElementById('email-to');
    const subjectEl = document.getElementById('email-subject');
    const bodyEl = document.getElementById('email-body');
    
    if (!toEl) return 'mailto:test@example.com';
    
    const to = toEl.value || 'test@example.com';
    let m = `mailto:${to}`;
    const p = [];
    if (subjectEl?.value) p.push(`subject=${encodeURIComponent(subjectEl.value)}`);
    if (bodyEl?.value) p.push(`body=${encodeURIComponent(bodyEl.value)}`);
    return p.length ? m + '?' + p.join('&') : m;
  },

  sms: () => {
    const phoneEl = document.getElementById('sms-phone');
    const messageEl = document.getElementById('sms-message');
    
    if (!phoneEl) return 'sms:+1234567890';
    
    const phone = phoneEl.value || '+1234567890';
    const message = messageEl ? messageEl.value : '';
    return message ? `sms:${phone}?body=${encodeURIComponent(message)}` : `sms:${phone}`;
  },

  phone: () => {
    const phoneEl = document.getElementById('phone-number');
    return `tel:${phoneEl?.value || '+1234567890'}`;
  }
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