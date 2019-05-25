import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA';

// sync actions for getting questions
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function requestQuestions() {
  return {
    type: REQUEST_QUESTIONS,
    isRetrieving: true
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    isRetrieving: false,
    questions
  }
}

export const fetchQuestions = () => dispatch => {
  dispatch(requestQuestions());
  return _getQuestions()
          .then(data => dispatch(receiveQuestions(data)));
}


export const REQUEST_ANSWER_UPDATE = 'REQUEST_ANSWER_UPDATE';
export const RECEIVE_ANSWER_UPDATE = 'RECEIVE_ANSWER_UPDATE';

export function requestAnswerUpdate() {
  return {
    type: REQUEST_ANSWER_UPDATE,
    isRetrieving: true
  }
}

export function receiveAnswerUpdate(authedUser, qid, answer) {
  console.log('authedUser: ' + authedUser);

  return {
    type: RECEIVE_ANSWER_UPDATE,
    isRetrieving: false,
    authedUser,
    qid,
    answer
  }
}

export const updateAnswer = (authedUser, qid, answer) => dispatch => {
  dispatch(requestAnswerUpdate());
  let paramsObj = {authedUser, qid, answer};
  _saveQuestionAnswer(paramsObj);
  dispatch(receiveAnswerUpdate(authedUser, qid, answer));
}

export const REQUEST_SAVE_QUESTION = 'REQUEST_SAVE_QUESTION';
export const RECEIVE_SAVE_QUESTION = 'RECEIVE_SAVE_QUESTION';

export function requestSaveQuestion() {
  return {
    type: REQUEST_SAVE_QUESTION,
    isRetrieving: true
  }
}

export function receiveSaveQuestion(question) {
  return {
    type: RECEIVE_SAVE_QUESTION,
    isRetrieving: false,
    question
  }
}

export const saveQuestion = ({optionOneText, optionTwoText, author}) => dispatch => {
  dispatch(requestSaveQuestion());
  return _saveQuestion({optionOneText, optionTwoText, author})
    .then((resp) => dispatch(receiveSaveQuestion(resp))
    )}
