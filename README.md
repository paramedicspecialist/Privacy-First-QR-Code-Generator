# Privacy-Focused QR Code Generator

A secure, open-source QR code generator that runs entirely in your browser. No data collection, no tracking, no server-side processing.

## Features

- **100% Client-Side**: All QR codes generated in your browser
- **Zero Data Collection**: No tracking, analytics, or data harvesting
- **12 QR Code Types**: URL/Text, WiFi, vCard, MeCard, Event, Bitcoin, Geo, Social, App, Email, SMS, Phone
- **Customization**: Colors, size (200-1000px), styles (square/rounded/dots), error correction, logo embedding
- **Accessibility**: Full ARIA support, keyboard navigation, high contrast mode, reduced motion
- **Themes**: Light/dark mode with system preference detection
- **Network Monitoring**: Real-time visibility of all network requests

## Quick Start

### Option 1: Local Web Server (Recommended)
```bash
python -m http.server 8000
# Then open http://localhost:8000
```

### Option 2: GitHub Pages
1. Fork this repository
2. Go to Settings > Pages
3. Select main branch and save
4. Access at `https://yourusername.github.io/Privacy-Focused-QR-Code-Generator/`

## Usage

1. Select a template (URL/Text, WiFi, vCard, etc.)
2. Fill in the required fields
3. Customize colors, size, and style
4. Download your QR code (PNG, JPG, or SVG)

## Privacy & Security

**What We Don't Collect:**
- Usage analytics or tracking data
- Personal information (names, emails, phone numbers)
- IP addresses or QR code content
- Device information or cookies
- Network information or behavioral data

**How It Works:**
All QR codes are generated entirely in your browser using JavaScript. No data is sent to external servers, stored in databases, or transmitted in any form.

**Third-Party Services:**
- **GitHub Pages**: Hosting service (see [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement))
- **hop.js CDN**: Content delivery for libraries (see [Bunny.net Privacy Policy](https://bunny.net/privacy/))

## Technical Details

**Browser Compatibility:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

**Libraries Used:**
- Bootstrap 5.3.8: UI framework and icons
- qrcode-generator 2.0.4: QR code generation engine
- DOMPurify 3.3.1: XSS protection and input sanitization

**File Structure:**
```
Privacy-Focused QR Code Generator/
├── index.html              # Main application
├── privacy-policy.html     # Privacy policy
├── css/
│   └── styles.css          # Styles
└── js/
    ├── main.js             # Core application
    └── modules/
        ├── network-monitor.js    # Network monitoring
        └── theme-manager.js      # Theme switching
```

**Total Size**: ~150 KB (very reasonable for a full-featured application)

## License

MIT License - see [LICENSE](LICENSE) file for details

---

**Built with ❤️ by Darkhorse** - Because your data belongs to you.

*Last Updated: December 12, 2025*