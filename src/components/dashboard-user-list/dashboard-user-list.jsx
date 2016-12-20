import React from 'react';

const UserList = ({ users = {}, nicknames, onUserDelete, onQuizScoreReset, onQuizUsersReset }) => (
  <div>
    <div className="text-left" style={{marginBottom: "10px"}}>
      <b>
        {Object.keys(users).length}</b> utenti / <a onClick={onQuizScoreReset.bind(this)}>score reset</a> / <a onClick={onQuizUsersReset.bind(this)}>users reset</a>
      </div>
    <table>
      <thead>
      <tr>
        <th>Nickname</th>
        <th>Id</th>
        <th>Score</th>
        <th className="text-right">Delete</th>
      </tr>
      </thead>
      <tbody>
      { users && Object.keys(users).length < 1 && <tr><td colSpan="3">Non ci sono Utenti connessi.</td></tr> }
      { users && nicknames && Object.keys(users).length > 0 && Object.keys(users).map((userId) => {
        return(
          <tr key={userId}>
            <td>{nicknames[users[userId].nickname]}</td>
            <td>{userId.toString().substr(0,5)}</td>
            <td>
              {users[userId].score != undefined && users[userId].score}
              {users[userId].score == undefined && <span>//</span>}
            </td>
            <td className="text-right"><a onClick={onUserDelete.bind(this, userId)}><i className="material-icons" style={{verticalAlign: "middle"}}>delete</i></a></td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  </div>
);

export default UserList;
