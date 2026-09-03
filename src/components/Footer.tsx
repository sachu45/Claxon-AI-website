
export function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img
          className="footer-logo"
          src="/claxon-logo.png"
          alt="Claxon AI"
        />
      </div>

      <span className="footer-tagline">Intelligence in motion.</span>

      <span>© {new Date().getFullYear()} Claxon AI</span>
    </footer>
  );
}
