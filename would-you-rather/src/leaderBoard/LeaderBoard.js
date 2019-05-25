import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getArFromDict, sortByAnswersCount } from '../utilities/utilities';

export class Leaderboard extends Component {

  render() {
    const {login, users} = this.props;
    let isLoggedin;
    let usersAr;

    if (login && login.isLoggedin) {
      isLoggedin = login.isLoggedin;
    }

    if (users && users.users) {
      usersAr = getArFromDict(users.users)
      usersAr = sortByAnswersCount(usersAr);
      console.log('usersAr: ' + JSON.stringify(usersAr));
    }

    return (
      <div class="">
        <h1 class="text-primary">Leaderboard</h1>
        <div class="spacer-sm"></div>
        <div class="row row-circle">
          {isLoggedin && (
            usersAr.map(user => {
              let numQuestionsAnswered = Object.keys(user.answers).length;

              return (
                <div key={user.id} class="leader-circle">
                  <h2>{user.name}</h2>
                  <p><img src={user.avatarURL} alt="user avatar" class="avatar" /></p>
                  <p>{numQuestionsAnswered} Questions answered</p>
                  <p>{user.questions.length} Questions asked</p>
                </div>
              )
            })
          )}
        </div>

        {!isLoggedin && (
          <div>Sorry, you need to log in to view this page.</div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ login, users }) {
  return {
    login,
    users,
  }
}

export default connect(mapStateToProps)(Leaderboard);
