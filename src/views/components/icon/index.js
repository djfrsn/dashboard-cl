import React, { PropTypes } from 'react';
import styles from './icon_styles.scss';

const Icon = ({className}) => <i className={styles[className]} aria-hidden="true" />;

Icon.propTypes = {
  className: PropTypes.string.isRequired
};

export default Icon;
