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
    const {login, questions, match, usersList} = this.props;
    const qid = match.params.question_id;
    let isLoggedin;
    let loginId;
    let question;
    let questionAnswered = false;
    let totalUsers = Object.keys(usersList).length;
    let firstOptionText;
    let firstOptionVotes;
    let firstOptionVotePercent;
    let secondOptionText;
    let secondOptionVotes;
    let secondOptionVotePercent;
    let avatarUrl = '';
    let userAnswer;
    let questionClass1 = 'question-answered'
    let questionClass2 = 'question-answered'

    if (login && login.isLoggedin) {
      isLoggedin = login.isLoggedin;
      loginId = login.loginId;
    }

    if (questions && questions.questions) {
      question = questions.questions[qid];
      if (question) {
        firstOptionText = question['optionOne']['text'];
        firstOptionVotes = question['optionOne']['votes'].length;
        firstOptionVotePercent = getPercentVoted(firstOptionVotes, totalUsers);
        secondOptionText = question['optionTwo']['text'];
        secondOptionVotes = question['optionTwo']['votes'].length;
        secondOptionVotePercent = getPercentVoted(secondOptionVotes, totalUsers);
        let authorId = question['author']
        if (usersList[authorId]) {
          avatarUrl = usersList[authorId]['avatarURL'];
        }
      }
    }

    if (isLoggedin && question) {
      let userAnsweredQuestions = Object.keys(usersList[loginId]['answers']);
      if (userAnsweredQuestions.indexOf(qid) > -1) {
        questionAnswered = true;
      }
      userAnswer = usersList[loginId]['answers'][qid];
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
                <p>1: {firstOptionText}</p>
                <div class="row row-circle">
                  <div class="vote-circle">{firstOptionVotes} votes</div>
                  <div class="vote-circle">{firstOptionVotePercent} % voted</div>
                </div>
              </div>
              <div class={questionClass2}>
                <p>2: {secondOptionText}</p>
                <div class="row row-circle">
                  <div class="vote-circle">{secondOptionVotes} votes</div>
                  <div class="vote-circle">{secondOptionVotePercent} % voted</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoggedin && !questionAnswered && (
          <div>
            <h1><img src={avatarUrl} alt="user avatar" class="avatar" /> Would You Rather?</h1>
            <div class="row">
              <p id="optionOne" class="option" onClick={(ev) => this.onClickHandler(loginId, qid, ev.target.id)}>1: {firstOptionText}</p>
              <p id="optionTwo" class="option" onClick={(ev) => this.onClickHandler(loginId, qid, ev.target.id)}>2: {secondOptionText}</p>
            </div>
          </div>
        )}

        {isLoggedin && !question && (
          <Redirect to="/404" />
        )}

        {!isLoggedin && (
          <div><h1>You need to login to view the question.</h1></div>
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
