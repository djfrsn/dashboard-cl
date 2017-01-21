import React, { Component, PropTypes } from 'react';
import styles from './default.scss';


export class Default extends Component {
  // static propTypes = {
  //   auth: PropTypes.object.isRequired,
  //   authFlow: PropTypes.func.isRequired,
  //   createUserWithEmailAndPassword: PropTypes.func.isRequired,
  //   routing: PropTypes.object.isRequired,
  //   sendPasswordResetEmail: PropTypes.func.isRequired,
  //   signInWithEmailAndPassword: PropTypes.func.isRequired
  // };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <div className={styles.centerContent}>
        nav
      </div>
    );
  }
}

export default Default;
