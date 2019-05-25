import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { getArFromDict, sortByPropertyDesc, getPrettyQuestion,
  getUnansweredQuestions } from '../utils/utils';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionType: "unanswered",
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};

    stateChange[ev.target.name] = value;
    this.setState(stateChange);
  }

  render() {
    const {userAnswers, isLoggedin, questions} = this.props;
    let questionsArSorted;
    let questionsAr;

    if (questions) {
      questionsAr = getArFromDict(questions);
      questionsArSorted = sortByPropertyDesc(questionsAr, 'timestamp');
    }

    let questionsList = [];
    let questionsListSorted = [];

    if (userAnswers && questions && this.state.questionType === "unanswered") {
      questionsList = getUnansweredQuestions(userAnswers, questions);
    }

    if (userAnswers && questions && this.state.questionType === "answered") {
      questionsList = Object.keys(userAnswers);
    }

    if (questionsList && questionsArSorted) {
      let questionIdRecentToOld = questionsArSorted.map(obj => obj['id']);
      questionIdRecentToOld.forEach(questionId => {
        if (questionsList.indexOf(questionId) > -1) {
          questionsListSorted.push(questionId)
        }
      })
      questionsList = questionsListSorted;
    }

    return (
      <div class="">
        <h1 class="text-primary mb-2">Home</h1>
        {isLoggedin && (
          <div>
            <label>  Please choose question type
              <select value={this.state.loginUser} onChange={this.onChangeHandler} name="questionType">
                <option value="unanswered">Unanswered Questions</option>
                <option value="answered">Answered Questions</option>
              </select>
            </label>

            <hr />

            <ul>
            {questionsList.map(questionId => {
              let prettyQuestion = getPrettyQuestion(questionId, questions);
              let link = `/questions/${questionId}`
              return (
                <li key={questionId}>
                  <span><Link to={link} class="question-list">Would You Rather: {prettyQuestion}</Link></span>
                </li>
              )
            })}
            </ul>
          </div>
        )}

        {!isLoggedin && (
          <div><h1 class="text-dark">You need to login to view this page</h1></div>
        )}

      </div>
    )
  }
}

export default Questions;
