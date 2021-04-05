import React from 'react';
import styles from './Icon.module.scss';
import defs from './symbol-defs.svg';

const Icon: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <span className={styles.svgIcon}>
      <svg>
        <use href={`${defs}#i-${icon}`} />
      </svg>
    </span>
  );
};

export default Icon;
