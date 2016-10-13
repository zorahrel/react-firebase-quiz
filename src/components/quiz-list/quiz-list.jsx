import React from 'react';

const QuizList = ({ quizzes, onSelect }) => (
  <div>
    { quizzes && quizzes.length < 1 && <div>Non ci sono Quiz aperti al momento.</div> }
    { quizzes && quizzes.map((quiz, key) => <button key={key} className="waves-effect waves-light btn-large" onClick={onSelect.bind(this, key)} disabled={quiz.closed}>Unisciti al <b>{quiz.name}</b> Quiz</button>) }
  </div>
);

export default QuizList;
