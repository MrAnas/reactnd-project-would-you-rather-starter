// helper functions


export function getArFromDict(dict) {
  let resultAr = Object.keys(dict).map(id => dict[id]);
  return resultAr;
}


export function sortByPropertyDesc(ar, prop) {
  ar.sort((a, b) => {
    return b[prop] - a[prop];
  })

  return ar;
}


export function getPrettyQuestion(questionId, questionsDict) {
  if (questionsDict && questionId) {
    let option1 = questionsDict[questionId]['optionOne']['text'];
    let option2 = questionsDict[questionId]['optionTwo']['text'];
    return `${option1} OR ${option2}?`
  }
  return
}


export function getUnansweredQuestions(userAnswers, allQuestions) {
  let unansweredQuestions;
  let answeredSet;
  if (userAnswers) {
    answeredSet = new Set(Object.keys(userAnswers));
  }
  let allQuestionsSet;
  if (allQuestions) {
    allQuestionsSet = new Set(Object.keys(allQuestions));
  }

  if (allQuestionsSet && answeredSet) {
    unansweredQuestions = [...allQuestionsSet].filter(questionId => !answeredSet.has(questionId))
  }

  return unansweredQuestions;
}


export function getPercentVoted(numVotes, totalUsers) {
  return Math.round(numVotes / totalUsers * 100);
}


export function sortByAnswersCount(ar) {
  ar.sort((a, b) => {
    let bNumAnswers = Object.keys(b.answers).length;
    let aNumAnswers = Object.keys(a.answers).length;
    return bNumAnswers - aNumAnswers;
  });
  return ar;
}
