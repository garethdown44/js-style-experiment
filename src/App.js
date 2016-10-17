import React, { Component } from 'react';
import styles from './App.styles';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>hello
        <div className={styles.inner}>inner</div>
      </div>
    );
  }
}

export default App;
