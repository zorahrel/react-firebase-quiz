import React from 'react';

const QuizList = ({
  quizzes,
  users,
  nicknames,
  onQuizStart,
  onQuizStop,
  onQuizResults,
  onQuizClose,
  onQuizOpen,
  onQuizDone,
  onQuizUndone,
  onQuizQuestionSelect,
  onQuizQuestionStart,
  onQuizQuestionStop,
  onQuizQuestionTimerStart,
  onQuizQuestionTimerReset
}) => (
  <div>
    <div className="text-left" style={{marginBottom: "10px"}}><b>{quizzes.length}</b> quiz</div>
    <table>
      <thead>
      <tr>
        <th>Questions</th>
        <th>Winner</th>
        <th className="text-right">Actions</th>
      </tr>
      </thead>
      <tbody>
      { quizzes && quizzes.length < 1 && <tr><td colSpan="3">Non ci sono Quiz disponibili.</td></tr> }
      { quizzes && quizzes.length > 0 && quizzes.map((quiz, quizId) => {
        return(
          <tr key={quizId}>
            <td>
              <table className="bordered">
                <tbody>
                  { quiz.questions.map((question, questionId) => {
                    return(
                     <tr key={questionId}>
                       <td>
                         <input onChange={onQuizQuestionSelect.bind(this, quizId, questionId)} type="checkbox" id={`question${questionId}`} checked={quiz.currentQuestion==questionId} />
                         <label htmlFor={`question${questionId}`}>{question.question.substr(0,10)}...</label>
                       </td>
                       <td>
                         <a onClick={onQuizQuestionTimerStart.bind(this, quizId, questionId, question.remainingTime)}>
                           <i className="material-icons" style={{verticalAlign: "middle", lineHeight: "21px", marginRight: "3px"}}>alarm_on</i>
                         </a>
                         {question.remainingTime} / <a onClick={onQuizQuestionTimerReset.bind(this, quizId, questionId)}>reset</a>
                       </td>
                       { question.userAnswers && <td>{ Object.keys(question.userAnswers).length } risp.</td>}
                       <td>
                         { !question.started && <a onClick={onQuizQuestionStart.bind(this, quizId, questionId)}>Start <i className="material-icons" style={{verticalAlign: "middle"}}>play_arrow</i></a> }
                         { question.started && <a onClick={onQuizQuestionStop.bind(this, quizId, questionId)}>Stop <i className="material-icons" style={{verticalAlign: "middle"}}>pause</i></a> }
                      </td>
                     </tr>
                    )
                  }) }
                </tbody>
              </table>
            </td>
            <td>
              <b>{nicknames[users[quiz.winner].nickname]} <small>({quiz.winner.toString().substr(0,5)})</small></b>
            </td>
            <td className="text-right">
              <div>
                { !quiz.started && <a onClick={onQuizStart.bind(this, quizId)}>Start <i className="material-icons" style={{verticalAlign: "middle"}}>play_arrow</i></a> }
                { quiz.started && <a onClick={onQuizStop.bind(this, quizId)}>Pause <i className="material-icons" style={{verticalAlign: "middle"}}>pause</i></a> }
              </div>
              <div>
                { !quiz.closed && <a onClick={onQuizClose.bind(this, quizId)}>Close <i className="material-icons" style={{verticalAlign: "middle"}}>visibility_off</i></a> }
                { quiz.closed && <a onClick={onQuizOpen.bind(this, quizId)}>Open <i className="material-icons" style={{verticalAlign: "middle"}}>visibility</i></a> }
              </div>
              <div>
                <a onClick={onQuizResults.bind(this, quizId)}>Results <i className="material-icons" style={{verticalAlign: "middle"}}>thumbs_up_down</i></a>
              </div>
              <div>
                { !quiz.done && <a onClick={onQuizDone.bind(this, quizId)}>Done <i className="material-icons" style={{verticalAlign: "middle"}}>done</i></a> }
                { quiz.done && <a onClick={onQuizUndone.bind(this, quizId)}>Undone <i className="material-icons" style={{verticalAlign: "middle"}}>replay</i></a> }
              </div>

            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  </div>
);

export default QuizList;
