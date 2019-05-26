import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { receiveLogin, receiveLogout } from './redux/actions/loginActions';

import AddQuestion from './questions/AddQuestion';
import Leaderboard from './leaderBoard/LeaderBoard';
import { getArFromDict } from './utils/utils';

import { fetchUsers } from './redux/actions/usersActions';
import { fetchQuestions } from './redux/actions/questionsActions';
import Questions from './questions/Questions';
import Question from './questions/Question';


import './App.css';
import NotFound from './NotFound';


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
        <div className="App d-flex">
          <nav className="navbar d-flex flex-column navbar-expand-lg navbar-light bg-primary">
            <Link to="/" className="navbar-brand header-main">WOULD YOU RATHER</Link>
            {isLoggedin === false && ( 
              <li> 
                    <select value={this.state.loginUser} 
                      onChange={this.onChangeHandler} name="loginUser"
                      className="select-login">
                      <option value="">Login</option>
                      {userAr.map(user => {
                        return (<option value={user["id"]} key={user["id"]}>{user["name"]}</option>)
                      })}
                    </select>
                    </li>
                )}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

                      
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav d-flex flex-column mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">Add Question</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Leaderboard" className="nav-link">Leaderboard</Link>
                </li>

                

                {isLoggedin === true && (
                  <li className="nav-item">
                    <Link to="/" onClick={this.logout} className="nav-link">Logout {currentUser}</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>


          <main className="flex-grow-1 container mt-5">
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
            <Route exact path="/404" render={() => (
                <NotFound />
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
