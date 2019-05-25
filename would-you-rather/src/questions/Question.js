import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { fetchQuestions, updateAnswer } from '../redux/actions/questionsActions';
import { getPercentVoted } from '../utilities/utilities';


export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    // making BE request to support user entering the url manually into browser
    this.props.fetchQuestions();
  }

  onClickHandler(uid, qid, answer) {
    console.log('answer: ' + answer);
    this.props.updateAnswer(uid, qid, answer);
  }

  render() {
    const {login, questions, match, userDictionary} = this.props;
    const qid = match.params.question_id;
    let isLoggedin;
    let loggedInId;
    let question;
    let questionAnswered = false;
    let totalUsers = Object.keys(userDictionary).length;
    let option1Text;
    let option1Votes;
    let option1VotePercent;
    let option2Text;
    let option2Votes;
    let option2VotePercent;
    let avatarUrl = '';
    let userAnswer;
    let questionClass1 = 'question-answered'
    let questionClass2 = 'question-answered'

    if (login && login.isLoggedin) {
      isLoggedin = login.isLoggedin;
      loggedInId = login.loggedInId;
    }

    if (questions && questions.questions) {
      question = questions.questions[qid];
      if (question) {
        option1Text = question['optionOne']['text'];
        option1Votes = question['optionOne']['votes'].length;
        option1VotePercent = getPercentVoted(option1Votes, totalUsers);
        option2Text = question['optionTwo']['text'];
        option2Votes = question['optionTwo']['votes'].length;
        option2VotePercent = getPercentVoted(option2Votes, totalUsers);
        let authorId = question['author']
        if (userDictionary[authorId]) {
          avatarUrl = userDictionary[authorId]['avatarURL'];
        }
      }
    }

    if (isLoggedin && question) {
      let userAnsweredQuestions = Object.keys(userDictionary[loggedInId]['answers']);
      if (userAnsweredQuestions.indexOf(qid) > -1) {
        questionAnswered = true;
      }
      userAnswer = userDictionary[loggedInId]['answers'][qid];
      console.log('userAnswer: ' + userAnswer)
      if (userAnswer === 'optionOne') {
        questionClass1 = "question-answered user-selected"
      }
      if (userAnswer === 'optionTwo') {
        questionClass2 = "question-answered user-selected"
      }
    }

    return (
      <div class="">
        {isLoggedin && questionAnswered && (
          <div>
            <h1>Users Answered</h1>
            <p><img src={avatarUrl} alt="user avatar" class="avatar" /></p>
            <div class="row">
              <div class={questionClass1}>
                <p>1: {option1Text}</p>
                <div class="row row-circle">
                  <div class="vote-circle">{option1Votes} votes</div>
                  <div class="vote-circle">{option1VotePercent} % voted</div>
                </div>
              </div>
              <div class={questionClass2}>
                <p>2: {option2Text}</p>
                <div class="row row-circle">
                  <div class="vote-circle">{option2Votes} votes</div>
                  <div class="vote-circle">{option2VotePercent} % voted</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoggedin && !questionAnswered && (
          <div>
            <h1><img src={avatarUrl} alt="user avatar" class="avatar" /> Would You Rather?</h1>
            <div class="row">
              <p id="optionOne" class="option" onClick={(ev) => this.onClickHandler(loggedInId, qid, ev.target.id)}>1: {option1Text}</p>
              <p id="optionTwo" class="option" onClick={(ev) => this.onClickHandler(loggedInId, qid, ev.target.id)}>2: {option2Text}</p>
            </div>
          </div>
        )}

        {isLoggedin && !question && (
          <Redirect to="/404" />
        )}

        {!isLoggedin && (
          <div>Sorry, you need to log in to view this question.</div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ login, questions }) {
  return {
    login,
    questions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchQuestions, updateAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
