import React from 'react';
import { auth, database } from 'firebase';

import logoSrc from 'commons/images/012_xmas_logo.png';
import Login from 'components/login/login';
import UserList from 'components/dashboard-user-list/dashboard-user-list';
import QuizList from 'components/dashboard-quiz-list/dashboard-quiz-list';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
      users: [],
      nicknames: [],
      quizzes: []
    };
  }

  componentWillMount() {
    let dashboard = this;
    auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        // Admin is signed in.
        dashboard.setState({ logged: true });

        // Database connection
        const db = database();

        // Users update
        dashboard.usersRef = db.ref('users');
        dashboard.usersRef.on('value', snapshot => dashboard.setState({ users: snapshot.val() }));

        // Nicknames update
        dashboard.nicknamesRef = db.ref('nicknames');
        dashboard.nicknamesRef.on('value', snapshot => dashboard.setState({ nicknames: snapshot.val() }));

        // Quizzes update
        dashboard.quizzesRef = db.ref('quizzes');
        dashboard.quizzesRef.on('value', snapshot => dashboard.setState({ quizzes: snapshot.val() }));
      } else {
        // User is signed out.
        dashboard.setState({ logged: false });
      }
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  handleLogin(email, password) {
    auth().signInWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }

  handleLogout() {
    auth().signOut().catch(error => {
      // An error happened.
      console.log(error);
    });
  }

  handleUserDelete(userId) {
    this.usersRef = database().ref('users/'+userId).remove();
  }
  handleQuizStart(quizId) {
    let updates = {};
    updates['started'] = true;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizStop(quizId) {
    let updates = {};
    updates['started'] = false;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizResults(quizId) {
    this.state.quizzes[quizId].questions.map((question, questionId) => {
      console.log(question)
      question.userAnswers && Object.keys(question.userAnswers).map(userId => {
        if(question.userAnswers[userId] == question.correctAnwser) {
          let updates = {};
          updates['correctAnswers/'+questionId] = true;
          this.usersRef.child(userId).update(updates);
        } else {
          console.log('err')
          let updates = {};
          updates['wrongAnswers/'+questionId] = true;
          this.usersRef.child(userId).update(updates);
        }
      });
    });
    this.usersRef.once('value', snapshot => {
      let users = snapshot.val();
      Object.keys(users).map((userId) => {
        let score = 0;
        users[userId].correctAnswers && users[userId].correctAnswers.map(() => {
          score +=3;
        });
        users[userId].wrongAnswers && users[userId].wrongAnswers.map(() => {
          score -=0.5;
        });
        let updates = {};
        updates['score'] = score;
        this.usersRef.child(userId).update(updates);
      })
    });
    this.usersRef.orderByChild('score').limitToLast(1).once('value', snapshot => {
      let updates = {};
      updates['winner'] = Object.keys(snapshot.val())[0];
      this.quizzesRef.child(quizId).update(updates);
    });
  }
  handleQuizClose(quizId) {
    let updates = {};
    updates['closed'] = true;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizOpen(quizId) {
    let updates = {};
    updates['closed'] = false;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizDone(quizId) {
    let updates = {};
    updates['done'] = true;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizUndone(quizId) {
    let updates = {};
    updates['done'] = false;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizQuestionSelect(quizId, questionId) {
    let updates = {};
    updates['currentQuestion'] = questionId;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizQuestionStart(quizId, questionId) {
    let updates = {};
    updates[`questions/${questionId}/started`] = true;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizQuestionStop(quizId, questionId) {
    let updates = {};
    updates[`questions/${questionId}/started`] = false;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizQuestionTimerStart(quizId, questionId, from) {
    let updates = {};
    let timer = from;
    const timerUpdate = () => {
      if(timer > 0) {
        timer--;
        updates[`questions/${questionId}/remainingTime`] = timer;
        this.quizzesRef.child(quizId).update(updates);
        setTimeout(timerUpdate, 1000);
      }
    };
    timerUpdate();
  }
  handleQuizQuestionTimerReset(quizId, questionId) {
    let updates = {};
    updates[`questions/${questionId}/remainingTime`] = 100;
    this.quizzesRef.child(quizId).update(updates);
  }
  handleQuizScoreReset() {
    let usersRef = this.usersRef;
    Object.keys(this.state.users).map((userId) => {
      usersRef.child(userId).child('correctAnswers').remove();
      usersRef.child(userId).child('wrongAnswers').remove();
      usersRef.child(userId).child('score').remove();
    })
    let quizzesRef = this.quizzesRef;
    Object.keys(this.state.quizzes).map((quizId) => {
      quizzesRef.child(quizId).child('winner').remove();

      Object.keys(this.state.quizzes[quizId].questions).map((questionId) => {
        quizzesRef.child(quizId).child('questions').child(questionId).child('userAnswers').remove();
      });

    });
  }
  handleQuizUsersReset() {
    Object.keys(this.state.users).map((userId) => {
      this.usersRef.child(userId).remove();
    })
    Object.keys(this.state.quizzes).map((quizId) => {
        this.quizzesRef.child(quizId).child('users').remove();
    });
  }

  render() {
    let { logged, users, quizzes, nicknames } = this.state;
    return(
      <div className="container valign text-center">
        { !logged && <div><img src={logoSrc} className="responsive-img" width="290px" style={{margin: "0 auto 30px"}}/>
            <Login onSubmit={this.handleLogin.bind(this)} />
        </div> }
        { logged && <div>
          <div style={{marginBottom: "30px"}}>

          </div>
          <div style={{marginBottom: "30px"}}>
            <QuizList
              quizzes={quizzes || {}}
              users={users || {}}
              nicknames={nicknames || {}}
              onQuizStart={this.handleQuizStart.bind(this)}
              onQuizStop={this.handleQuizStop.bind(this)}
              onQuizClose={this.handleQuizClose.bind(this)}
              onQuizOpen={this.handleQuizOpen.bind(this)}
              onQuizResults={this.handleQuizResults.bind(this)}
              onQuizQuestionSelect={this.handleQuizQuestionSelect.bind(this)}
              onQuizQuestionStart={this.handleQuizQuestionStart.bind(this)}
              onQuizQuestionStop={this.handleQuizQuestionStop.bind(this)}
              onQuizDone={this.handleQuizDone.bind(this)}
              onQuizUndone={this.handleQuizUndone.bind(this)}
              onQuizQuestionTimerStart={this.handleQuizQuestionTimerStart.bind(this)}
              onQuizQuestionTimerReset={this.handleQuizQuestionTimerReset.bind(this)}
            />
          </div>
          <div style={{marginBottom: "30px"}}>
            <UserList
              users={users || {}}
              nicknames={nicknames || {}}
              onUserDelete={this.handleUserDelete.bind(this)}
              onQuizScoreReset={this.handleQuizScoreReset.bind(this)}
              onQuizUsersReset={this.handleQuizUsersReset.bind(this)}
            />
          </div>
          <div className="text-right"><button className="waves-effect waves-light btn" onClick={this.handleLogout.bind(this)}>Logout</button></div>
          <div className="fixed-action-btn"><img src={logoSrc} className="responsive-img" width="100px"/></div>
        </div> }
      </div>
    );
  }
}

export default Dashboard;
