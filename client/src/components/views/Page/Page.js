import React from 'react';
import styles from './Page.module.scss';

const Page = ({ children }) => {
  return (
    <div
      // className={styles.wholePage}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default Page;
