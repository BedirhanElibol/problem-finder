import React from 'react';

/**
 * CareLog Pricing Card Component
 * Fixes:
 * - Overlapping badge issue via relative positioning and generous card padding-top.
 * - Text redundancy by removing duplicate "(Tavsiye Edilen)" from title.
 * - Contrast & color harmony using Slate dark mode + Indigo accents.
 */
export default function PricingCard({
  badgeText = "Eğitmen Tavsiyesi",
  title = "Tam Kreş Paketi",
  subtitle = "Orta boy kreşler için (5 Sınıf / 100 Öğrenci)",
  price = "49",
  currency = "$",
  period = "/ay",
  features = [
    "5 Sınıf / 100 Öğrenci",
    "Dokunmatik Toplu Loglama",
    "Fotoğraf ve Video Storage",
    "İlaç Talep Yönetimi"
  ],
  ctaText = "Tam Kreş Demosunu Başlat",
  onCtaClick = () => {}
}) {
  return (
    <div style={styles.card}>
      {/* Badge placed cleanly on top edge */}
      {badgeText && (
        <div style={styles.badge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {badgeText}
        </div>
      )}

      {/* Card Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Price */}
      <div style={styles.priceContainer}>
        <span style={styles.currency}>{currency}</span>
        <span style={styles.amount}>{price}</span>
        <span style={styles.period}>{period}</span>
      </div>

      {/* Feature List */}
      <ul style={styles.featureList}>
        {features.map((feature, idx) => (
          <li key={idx} style={styles.featureItem}>
            <svg style={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button style={styles.ctaButton} onClick={onCtaClick}>
        {ctaText}
      </button>
    </div>
  );
}

const styles = {
  card: {
    position: 'relative',
    backgroundColor: '#0f172a',
    border: '1px solid rgba(99, 102, 241, 0.35)',
    borderRadius: '20px',
    padding: '40px 28px 28px 28px', // High top-padding prevents badge overlap
    width: '100%',
    maxWidth: '360px',
    color: '#f8fafc',
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.12)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box'
  },
  badge: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '6px 16px',
    borderRadius: '9999px',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  header: {
    marginBottom: '20px'
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 6px 0',
    lineHeight: '1.3'
  },
  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
    lineHeight: '1.4'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '24px'
  },
  currency: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#818cf8'
  },
  amount: {
    fontSize: '48px',
    fontWeight: '800',
    lineHeight: '1',
    color: '#ffffff',
    margin: '0 4px'
  },
  period: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 28px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#cbd5e1'
  },
  checkIcon: {
    width: '18px',
    height: '18px',
    stroke: '#10b981',
    flexShrink: 0
  },
  ctaButton: {
    width: '100%',
    padding: '14px 20px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
    transition: 'all 0.2s ease'
  }
};
