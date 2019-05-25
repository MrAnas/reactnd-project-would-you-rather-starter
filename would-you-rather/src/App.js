import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { receiveLogin, receiveLogout } from './redux/actions/loginActions';

import AddQuestion from './questions/AddQuestion';
import Leaderboard from './leaderboard/Leaderboard';
import { getArFromDict } from './utilities/utilities';

import { fetchUsers } from './redux/actions/usersActions';
import { fetchQuestions } from './redux/actions/questionsActions';
import Questions from './questions/Questions';
import Question from './questions/Question';


import './App.css';


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: '',
      isLoggedin: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchQuestions();
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function() {
      if (this.state.loginUser.length) {

        this.props.receiveLogin(this.state.loginUser);
      }
    });
  }

  logout(ev) {
    this.setState({loginUser: ''});
    this.props.receiveLogout();
  }

  render() {
    let isLoggedin;
    let usersList;
    let currentUser;
    let userAr;
    let questionsList;
    let userAnswers;
    let userQuestions;

    if (this.props.users
       &&
        this.props.users.users) {
      usersList = this.props.users.users;
      userAr = getArFromDict(usersList);
    }

    if (this.props.login) {
      isLoggedin = this.props.login['isLoggedin'];
      if (isLoggedin) {
        let loggedInUid = this.state['loginUser'];
        if (usersList) {
          currentUser = usersList[loggedInUid]['name'];
        }
        if (this.props.questions && this.props.questions.questions) {
          questionsList = this.props.questions.questions;
          userAnswers = usersList[loggedInUid]['answers'];
          userQuestions = usersList[loggedInUid]['questions'];
        }
      }
    }

    return (
      <BrowserRouter>
        <div class="App d-flex">
          <nav class="navbar d-flex flex-column navbar-expand-lg navbar-light bg-primary">
            <Link to="/" class="navbar-brand header-main">WOULD YOU RATHER</Link>
            {isLoggedin === false && ( 
              <li> 
                    <select value={this.state.loginUser} 
                      onChange={this.onChangeHandler} name="loginUser"
                      class="select-login">
                      <option value="">Login</option>
                      {userAr.map(user => {
                        return (<option value={user["id"]} key={user["id"]}>{user["name"]}</option>)
                      })}
                    </select>
                    </li>
                )}
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav d-flex flex-column mr-auto">
                <li class="nav-item">
                  <Link to="/" class="nav-link">Home</Link>
                </li>
                <li class="nav-item">
                  <Link to="/add" class="nav-link">Add Question</Link>
                </li>
                <li class="nav-item">
                  <Link to="/Leaderboard" class="nav-link">Leaderboard</Link>
                </li>

                

                {isLoggedin === true && (
                  <li class="nav-item">
                    <Link to="/" onClick={this.logout} class="nav-link">Logout</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>


          <main class="flex-grow-1 container mt-5">
            <Route exact path="/" render={() => (
                <Questions isLoggedin={isLoggedin} 
                  userQuestions={userQuestions} 
                  userAnswers={userAnswers}
                  questions={questionsList}
                />
              )}
            />
            <Route exact path="/questions/:question_id" render={({match}) => (
                <Question match={match} usersList={usersList} />
              )}
            />
            <Route exact path="/add" render={() => (
                <AddQuestion />
              )}
            />
            <Route exact path="/Leaderboard" render={() => (
                <Leaderboard />
              )}
            />
            
          </main>

        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ login, users, questions }) {
  return {
    login,
    users,
    questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    fetchQuestions,
    receiveLogin,
    receiveLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
