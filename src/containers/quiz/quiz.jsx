import React from 'react';
import { auth, database, Promise } from 'firebase';

import QuizList from 'components/quiz-list/quiz-list';
import Quiz from 'components/quiz/quiz';

import logoSrc from 'commons/images/012_xmas_logo.png';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      users: [],
      nicknames: [],
      quizzes: []
    };
  }

  getFreeNickname(nicknames, users) {
    let id = false;
    const nLen = nicknames.length;
    const uIds = Object.keys(users);
    const uIdsLen = uIds.length;

    for(let i=0; i<nLen; i++) {
      let exist = false;
      for(let j=0; j<uIdsLen; j++) {
        if(i == users[uIds[j]].nickname) {
          exist = true;
          break;
        }
      }
      if(!exist) {
        id = i;
        break;
      }
    }
    if(id === false) {
      id = Math.floor(Math.random() * nLen);
    }
    return id;
  }

  componentWillMount() {
    let quiz = this;
    auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        quiz.setState({ user });

        // User state
        const db = database();

        quiz.db = db.ref();
        quiz.usersRef = db.ref('users');
        quiz.nicknamesRef = db.ref('nicknames');
        quiz.quizzesRef = db.ref('quizzes');
        quiz.userRef = db.ref('users/'+user.uid);

        let nicknames = [];
        let users = [];
        let quizzes = [];

        const updateLocal = (snapshot) => {
          nicknames = snapshot.val().nicknames || [];
          quiz.setState({ nicknames });

          users = snapshot.val().users || {};
          quiz.setState({ users });

          quizzes = snapshot.val().quizzes || [];
          quiz.setState({ quizzes });
          quizzes.map((quiz, quizId) => {
            Object.keys(quiz.users || {}).map(userKey => {
              if(quiz.users[userKey]==user.uid) {
                this.setState({ quiz: quizId });
              }
            })
          })
        }

        let quizPromise = quiz.db.once('value', updateLocal)
        .then(() => {
          if(!users[user.uid] || users[user.uid].nickname == undefined) {
            user.nickname = this.getFreeNickname(nicknames, users);
            quiz.userRef.set({ nickname: user.nickname });
            quiz.setState({ user });
          } else {
            quiz.setState({ user: { ...this.state.user, ...users[user.uid] } });
          }
          quiz.db.on('value', updateLocal);
        });

      } else {
        // User is signed out.
        quiz.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    if(this.userRef) {
      this.userRef.off();
    }
  }

  handleLogin() {
    auth().signInAnonymously().catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }

  handleLogout() {
    this.userRef.remove(() => {
      auth().signOut().catch(error => {
        // An error happened.
        console.log(error);
      });
    });
  }

  handleQuizSelect(quiz) {
    this.setState({ quiz });
    this.quizRef = database().ref('quizzes/'+quiz);
    let users = this.state.quizzes[quiz].users || [];
    let inList = false;
    for (var k in users) {
      if (!users.hasOwnProperty(k)) continue;
      if (users[k] === this.state.user.uid) {
        inList = true;
      }
    }
    if(!inList) {
      this.quizRef.child('users').push(this.state.user.uid);
    }
  }

  handleQuizAnswerSelect(question, answer) {
    database().ref(`quizzes/${this.state.quiz}/questions/${question}/userAnswers/${this.state.user.uid}`).set(answer);
  }

  logoSecret(item) {
    var that = this;
    if(item) {
      item.addEventListener('click', function (evt) {
        if (evt.detail === 3) {
          that.handleLogout();
        }
      });
    }
  }

  render() {
    const { quiz, user, users, quizzes, nicknames } = this.state;
    return(
      <div className="container valign text-center">
        { !user && <div><img src={logoSrc} className="responsive-img" width="620px"/><p style={{margin: "20px auto 30px", maxWidth: "400px"}}>Partecipando al Quiz accetti di essere abbinato ad un soprannome napoletano, utile ad identificarti e farti mantenere un anonimato molto comodo nel caso in cui il punteggio risultante sia molto basso.</p><button className="waves-effect waves-light btn-large" onClick={this.handleLogin.bind(this)}>Join the Quiz</button></div> }
        { user &&
         <div>
           { user.nickname != undefined && !!nicknames && <h1><b>{nicknames[user.nickname]} <small>({user.uid.toString().substr(0,5)})</small></b></h1> }
           { quiz == undefined && <QuizList quizzes={quizzes} onSelect={this.handleQuizSelect.bind(this)} /> }
           { quiz != undefined &&
              <Quiz quiz={quizzes[quiz]} user={user} users={users} nicknames={nicknames} onAnswerSelect={this.handleQuizAnswerSelect.bind(this)} /> }
           <div style={{margin: "20px auto 30px", maxWidth: "400px"}}>
             <p>Il Quiz consiste in 10 domande su argomenti di Informatica e Tecnologia.</p>
             <p>Altri <b>{Object.keys(users).length} connessi</b>.</p>
             <div className="fixed-action-btn" ref={this.logoSecret.bind(this)}><img src={logoSrc} className="responsive-img" width="100px"/></div>
           </div>
         </div> }
        { user && <button className="hide" onClick={this.handleLogout.bind(this)}>Logout</button> }
      </div>
    );
  }
}

export default Home;
