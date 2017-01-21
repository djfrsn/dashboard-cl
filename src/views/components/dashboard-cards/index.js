import React, { Component, PropTypes } from 'react';
import styles from './dashboard_cards.scss';


export class DashboardCards extends Component {
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
      <div className={styles.cardsContainer}>
        <div className={styles.cardContainer}>
          card 1
        </div>
        <div className={styles.cardContainer}>
          card 2
        </div>
        <div className={styles.cardContainer}>
          card 3
        </div>
        <div className={styles.cardContainer}>
          card 4
        </div>
      </div>
    );
  }
}

export default DashboardCards;
