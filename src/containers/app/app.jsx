import React from 'react';
import firebase from 'firebase';

import 'commons/styles/normalize.scss';
import 'commons/styles/base.scss';

const config = {
  apiKey: "AIzaSyBY9XjnqMRtmwe2JZvg9hoMynzhsNUGYeo",
  authDomain: "gdg-devfest-5eabc.firebaseapp.com",
  databaseURL: "https://gdg-devfest-5eabc.firebaseio.com",
  storageBucket: "gdg-devfest-5eabc.appspot.com",
  messagingSenderId: "530116530462"
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
