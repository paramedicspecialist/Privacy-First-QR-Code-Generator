/**
 * Theme Manager Module
 * Handles dark/light theme switching with system preference detection
 *
 * @version 1.0.0
 * @author Darkhorse
 * @license MIT
 */

export class ThemeManager {
    // Constants for theme names
    static THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };
    
    static STORAGE_KEY = 'qr-generator-theme';
    
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIconLight = document.getElementById('theme-icon-light');
        this.themeIconDark = document.getElementById('theme-icon-dark');
        this.htmlElement = document.documentElement;
        this.eventListeners = []; // Track event listeners for cleanup
        this.mediaQueryListeners = []; // Track media query listeners for cleanup
        this.isToggling = false; // Prevent race conditions
        
        // Validate required elements
        if (!this.themeToggle || !this.themeIconLight || !this.themeIconDark) {
            console.error('ThemeManager: Required DOM elements not found');
            return;
        }
        
        this.init();
    }

    /**
     * Initialize theme manager
     */
    init() {
        try {
            // Check for saved theme preference or default to system preference
            const savedTheme = localStorage.getItem(ThemeManager.STORAGE_KEY);
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Apply initial theme
            const initialTheme = savedTheme || (systemPrefersDark ? ThemeManager.THEMES.DARK : ThemeManager.THEMES.LIGHT);
            this.applyTheme(initialTheme);
            
            // Listen for system theme changes (only if user hasn't set a preference)
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const changeHandler = (e) => {
                    // Only auto-switch if user hasn't set a manual preference
                    if (!localStorage.getItem(ThemeManager.STORAGE_KEY)) {
                        this.applyTheme(e.matches ? ThemeManager.THEMES.DARK : ThemeManager.THEMES.LIGHT);
                    }
                };
                mediaQuery.addEventListener('change', changeHandler);
                this.mediaQueryListeners.push({ mediaQuery, handler: changeHandler });
            }
            
            // Theme toggle click handler
            const clickHandler = () => {
                // Prevent race condition: check if already toggling
                if (this.isToggling) return;
                
                this.isToggling = true;
                const currentTheme = this.htmlElement.getAttribute('data-theme') || ThemeManager.THEMES.LIGHT;
                const newTheme = currentTheme === ThemeManager.THEMES.LIGHT ? ThemeManager.THEMES.DARK : ThemeManager.THEMES.LIGHT;
                
                this.applyTheme(newTheme);
                // Save user preference
                localStorage.setItem(ThemeManager.STORAGE_KEY, newTheme);
                
                // Reset toggling flag after a short delay
                setTimeout(() => {
                    this.isToggling = false;
                }, 100);
            };
            this.themeToggle.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: this.themeToggle, event: 'click', handler: clickHandler });
            
            // Keyboard support for theme toggle
            const keydownHandler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.themeToggle.click();
                }
            };
            this.themeToggle.addEventListener('keydown', keydownHandler);
            this.eventListeners.push({ element: this.themeToggle, event: 'keydown', handler: keydownHandler });
        } catch (error) {
            console.error('ThemeManager initialization error:', error);
        }
    }
    
    /**
     * Cleanup resources to prevent memory leaks
     */
    cleanup() {
        try {
            // Remove all event listeners
            this.eventListeners.forEach(({ element, event, handler }) => {
                try {
                    if (element && element.removeEventListener) {
                        element.removeEventListener(event, handler);
                    }
                } catch (error) {
                    console.warn(`Failed to remove event listener: ${event}`, error);
                }
            });
            this.eventListeners = [];
            
            // Remove all media query listeners
            this.mediaQueryListeners.forEach(({ mediaQuery, handler }) => {
                try {
                    if (mediaQuery && mediaQuery.removeEventListener) {
                        mediaQuery.removeEventListener('change', handler);
                    }
                } catch (error) {
                    console.warn('Failed to remove media query listener', error);
                }
            });
            this.mediaQueryListeners = [];
        } catch (error) {
            console.error('ThemeManager cleanup error:', error);
        }
    }

    /**
     * Apply theme to the document
     * @param {string} theme - Theme name (light or dark)
     */
    applyTheme(theme) {
        try {
            if (theme === ThemeManager.THEMES.DARK) {
                this.htmlElement.setAttribute('data-theme', ThemeManager.THEMES.DARK);
                this.themeIconLight.style.display = 'none';
                this.themeIconDark.style.display = 'block';
                this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
                this.themeToggle.setAttribute('title', 'Switch to light mode');
            } else {
                this.htmlElement.removeAttribute('data-theme');
                this.themeIconLight.style.display = 'block';
                this.themeIconDark.style.display = 'none';
                this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                this.themeToggle.setAttribute('title', 'Switch to dark mode');
            }
            
            // Trigger a custom event for theme change
            const event = new CustomEvent('themeChanged', { detail: { theme } });
            document.dispatchEvent(event);
        } catch (error) {
            console.error('ThemeManager applyTheme error:', error);
        }
    }
}