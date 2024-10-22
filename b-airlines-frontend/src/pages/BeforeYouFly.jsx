import React from 'react';

const BeforeYouFly = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Before You Fly</h1>
      <p style={styles.subtitle}>Preparing for your journey? Make sure you're fully informed before taking off. We've curated some essential guidelines to ensure a smooth, safe, and enjoyable flight experience.</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Guide to Dangerous Goods</h3>
          <p style={styles.itemDescription}>
            Not sure what you can bring onboard? Check out our comprehensive guide to restricted items. Stay aware of the rules on liquids, batteries, and other potentially hazardous goods.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Rules and Notices</h3>
          <p style={styles.itemDescription}>
            Stay up-to-date with the latest travel regulations and safety protocols. Ensure you comply with both local and international aviation standards.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Health Information</h3>
          <p style={styles.itemDescription}>
            Flying soon? Make sure you're aware of any health precautions or vaccine requirements at your destination. Our health advisory section will help you stay fit and well-prepared for your trip.
          </p>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    color: '#333',
    padding: '40px',
    fontFamily: "'Arial', sans-serif",
    maxWidth: '900px',
    margin: 'auto',
    lineHeight: '1.6',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  itemTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#1a73e8',
  },
  itemDescription: {
    fontSize: '16px',
    color: '#666',
  },
};

export default BeforeYouFly;
