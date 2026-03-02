export default function Footer() {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '32px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--text)' }}></div>
      <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>© 2025 Parth. All rights reserved.</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="https://www.linkedin.com/in/parth-mistry-24396a166/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--text)'} onMouseOut={(e) => e.target.style.color = 'var(--muted)'}>LinkedIn</a>
        <a href="https://github.com/ParthMistry57" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--text)'} onMouseOut={(e) => e.target.style.color = 'var(--muted)'}>GitHub</a>
      </div>
    </footer>
  )
}