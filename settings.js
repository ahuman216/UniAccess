/**
 * UniAccess — Settings Manager
 * [A11Y] Applies user accessibility preferences on every page load.
 *        Uses localStorage — no server round-trip, no personal data sent.
 */

const UA = {
  defaults: {
    fontSize: 18,
    contrast: 'default',
    fontFamily: 'default',
    vibration: true,
    ttsRate: 1.0,
    ttsVoice: '',
  },

  get() {
    try {
      return { ...this.defaults, ...JSON.parse(localStorage.getItem('uniAccessSettings') || '{}') };
    } catch { return { ...this.defaults }; }
  },

  save(partial) {
    const current = this.get();
    const updated = { ...current, ...partial };
    localStorage.setItem('uniAccessSettings', JSON.stringify(updated));
    this.apply(updated);
  },

  apply(settings) {
    const root = document.documentElement;
    // Font size
    root.style.setProperty('--base-font-size', settings.fontSize + 'px');
    // Colour theme
    if (settings.contrast === 'default') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', settings.contrast);
    // Font family
    if (settings.fontFamily === 'dyslexia') root.setAttribute('data-font', 'dyslexia');
    else root.removeAttribute('data-font');
  },

  /** Screen reader announcement helper */
  announce(msg, priority = 'polite') {
    const el = document.getElementById(
      priority === 'assertive' ? 'a11y-alert-announcer' : 'a11y-announcer'
    );
    if (!el) return;
    el.textContent = '';
    requestAnimationFrame(() => { el.textContent = msg; });
  },

  /** Vibrate if supported and user has enabled it */
  vibrate(pattern = [200]) {
    if (!this.get().vibration) return;
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  },
};

// Apply settings immediately on every page
document.addEventListener('DOMContentLoaded', () => UA.apply(UA.get()));

// Expose globally
window.UA = UA;
