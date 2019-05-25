import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getArFromDict, sortByAnswersCount } from '../utilities/utilities';

export class Leaderboard extends Component {

  render() {
    const { login, users } = this.props;
    let isLoggedin;
    let usersAr;

    

    if (users && users.users) {
      usersAr = getArFromDict(users.users)
      usersAr = sortByAnswersCount(usersAr);
    }


    if (login && login.isLoggedin) {
      isLoggedin = login.isLoggedin;
    }
    return (
      <div class="">
        <h1 class="text-primary">Leaderboard</h1>
        <div class="spacer-sm"></div>
        <div class="row row-circle">
          <ul class="list-unstyled w-100">
            {isLoggedin && (

              usersAr.map(user => {
                let numQuestionsAnswered = Object.keys(user.answers).length;

                return (


                  <li class="media border rounded border-secondary mb-3 p-3">
                    <img width="80" a="mx-3" src={user.avatarURL} alt="user" />
                    <div class="media-body">
                      <h5 class="mt-0 mb-1">{user.name}</h5>
                      <p>{numQuestionsAnswered} Answered Questions </p>
                      <p>{user.questions.length} Asked Questions </p>
                    </div>
                  </li>
                    )
              })
            )}
          </ul>
        </div>

        {!isLoggedin && (
          <div><h1>You need to login to view this page</h1></div>
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
