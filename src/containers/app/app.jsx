import React from 'react';
import firebase from 'firebase';

import 'commons/styles/normalize.scss';
import 'commons/styles/base.scss';

const config = {
    apiKey: "AIzaSyD2Ydn0bRrD2jdgwYjK_CLXKGFLO-2I8zc",
    authDomain: "christmas-hack-party.firebaseapp.com",
    databaseURL: "https://christmas-hack-party.firebaseio.com",
    storageBucket: "christmas-hack-party.appspot.com",
    messagingSenderId: "381679773716"
};

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="valign-wrapper">{this.props.children}</div>
    );
  }
}

export default App;
