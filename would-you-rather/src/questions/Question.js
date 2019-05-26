import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { fetchQuestions, updateAnswer } from '../redux/actions/questionsActions';
import { getPercentVoted } from '../utils/utils';


export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  onClickHandler(userId, questionId, answer) {
    this.props.updateAnswer(userId, questionId, answer);
  }

  render() {
    const { login, questions, match, usersList } = this.props;
    const questionId = match.params.question_id;
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
      question = questions.questions[questionId];
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
      if (userAnsweredQuestions.indexOf(questionId) > -1) {
        questionAnswered = true;
      }
      userAnswer = usersList[loginId]['answers'][questionId];
      if (userAnswer === 'optionOne') {
        questionClass1 = "question-answered user-selected"
      }
      if (userAnswer === 'optionTwo') {
        questionClass2 = "question-answered user-selected"
      }
    }

    if (isLoggedin && question) {
      let userAnsweredQuestions = Object.keys(usersList[loginId]['answers']);
      if (userAnsweredQuestions.indexOf(questionId) > -1) {
        questionAnswered = true;
      }
      userAnswer = usersList[loginId]['answers'][questionId];
      console.log('userAnswer: ' + userAnswer)
      if (userAnswer === 'optionOne') {
        questionClass1 = "border border-primary"
      }
      if (userAnswer === 'optionTwo') {
        questionClass2 = "border border-primary"
      }
    }

    return (
      <div className="">
        {isLoggedin && questionAnswered && (
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-primary">Answers</h1>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className={questionClass1}>
                    <h2 className="mb-4">{firstOptionText}</h2>
                    <div className="">
                      <p><div><b>Number of Voters:</b> {firstOptionVotes} </div></p>
                      <p><div><b>Percentage:</b> {firstOptionVotePercent}% </div></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className={questionClass2}>
                    <h2 className="mb-4">{secondOptionText}</h2>
                    <div className="">
                    <p><div><b>Number of Voters:</b> {secondOptionVotes} </div></p>
                    <p><div><b>Percentage:</b> {secondOptionVotePercent}% </div></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoggedin && !questionAnswered && (

          <div className="row">
            <div className="col-md-12">
              <h1>Would You Rather?</h1>
              <img src={avatarUrl} alt="avatar"/>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Option One </h5>
                  <p id="optionOne" className="btn btn-primary" onClick={(ev) => this.onClickHandler(loginId, questionId, ev.target.id)}>{firstOptionText}</p>

                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Option Two</h5>
                  <p id="optionTwo" className="btn btn-primary" onClick={(ev) => this.onClickHandler(loginId, questionId, ev.target.id)}>{secondOptionText}</p>
                </div>
              </div>
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
