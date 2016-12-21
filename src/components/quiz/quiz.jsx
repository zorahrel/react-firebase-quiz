import React from 'react';
import styles from './quiz.scss';
import classNames from 'classnames/bind';

import Loader from 'components/loader/loader';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  handleAnswerSelect(questionId, answerId) {
    this.props.onAnswerSelect(questionId, answerId);
  }

  render() {
    const { started, done, currentQuestion, questions, winner } = this.props.quiz;
    const { users, user, nicknames } = this.props;
    return (
      <div>
        { !done && <div>
          { !started && <div><Loader/><h2>Il quiz sta per iniziare, tieniti pronto!</h2></div> }
          { started && <div>
            { currentQuestion != undefined && <div className="chip">{currentQuestion+1} / {questions.length}</div> }
            { currentQuestion != undefined &&
              <Question question={questions[currentQuestion]} onAnswerSelect={this.handleAnswerSelect.bind(this, currentQuestion)} userId={user.uid} />
            }
            { currentQuestion == undefined && <div>Attendi la prossima domanda</div> }
          </div> }
        </div> }
        { done && <div>
          { winner == undefined && <div style={{margin: "12px auto 10px", maxWidth: "400px"}}><Loader/><h2>Stiamo calcolando il vincitore</h2><p>Verranno attribuiti 3 punti per ogni domanda corretta e sottratti 0,5 punti per ogni risposta sbagliata. Nessuna variazione per risposte non date.</p></div> }
          { winner != undefined && <div>
            { user.uid != winner && <div><h2>Ci dispiace, hai perso! <i className="material-icons">thumb_down</i></h2><h3>Il vincitore è <b>{nicknames[users[winner].nickname]} <small>({winner.toString().substr(0,5)})</small></b></h3></div> }
            { user.uid == winner && <div><h1><i className="material-icons yellow-text text-darken-1">star</i> Il vincitore sei tu! <i className="material-icons yellow-text text-darken-1">star</i></h1><h2>Congratulazioni <b>{nicknames[users[winner].nickname]} <small>({winner.toString().substr(0,5)})</small></b></h2></div> }
          </div>}
          </div> }
      </div>
    )
  }
};

const Question = ({ userId, question, onAnswerSelect }) => {
  return (
    <div>
      { (!question.started || question.remainingTime==0) && <h3>Preparati per la prossima domanda!</h3> }
      { question.started && question.remainingTime>0 && <div style={{paddingTop: "20px"}}>
        <div><i className="material-icons" style={{verticalAlign: "text-bottom", fontSize: "1.2em"}}>info_outline</i> <span dangerouslySetInnerHTML={{__html: question.question}}/></div>
        <div className="collection" style={{margin: "12px auto 10px", maxWidth: "400px"}}>{ Object.keys(question.answers).map((answerId) => {
          const answerClasses = classNames.bind(styles)(
            'collection-item',
            {
              'active': question.userAnswers && question.userAnswers[userId]==answerId
            }
          );
          return(
            <a key={answerId} className={answerClasses} onClick={onAnswerSelect.bind(this, answerId)}>{question.answers[answerId]}</a>
          )
        })}</div>
        <div><b>{question.remainingTime}</b><i className="material-icons" style={{verticalAlign: "text-bottom", fontSize: "1.2em"}}>av_timer</i></div>
      </div> }
    </div>
  )
};

export default Quiz;
