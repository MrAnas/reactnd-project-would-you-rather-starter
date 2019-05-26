import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { saveQuestion } from '../redux/actions/questionsActions';

export class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: '',
      optionTwo: '',
      pollSubmitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange);
  }

  onSubmit(ev, loginId) {
    ev.preventDefault();
    let form = document.querySelector('.question-form')
    let question;
    let optionOneText = this.state.optionOne;
    let optionTwoText = this.state.optionTwo;
    let author = loginId;

    question = {optionOneText, optionTwoText, author}
    this.props.saveQuestion(question);
    form.reset();
    this.setState({pollSubmitted: true})
  }

  render() {
    const {login} = this.props;
    let isLoggedin;
    let loginId;

    if (login && login.isLoggedin) {
      isLoggedin = login.isLoggedin;
      loginId = login.loginId;
    }

    return (
      <div className="">
        <h1 className="text-primary">Add a Question</h1>

        {isLoggedin && (
          <form className="question-form">
          <div className="form-group">
          <label className="form-control-label">First Option</label>
          <input type="text" className="form-control input-text" name="optionOne" onChange={this.onChange} 
              placeholder="Option 1"
            />
              </div>
            
            <br />
            <div className="form-group">

            </div>
            <label className="form-control-label">Second Option</label>
            <input type="text" className="form-control input-text" name="optionTwo" onChange={this.onChange}
              placeholder="Option 2"
            />
            <br />
            <button className="btn btn-primary btn-block" value="save" onClick={(ev) => this.onSubmit(ev, loginId)}>Save</button>
          </form>
        )}

        {!isLoggedin && (
          <div><h1 className="text-dark">You need to login to view this page</h1></div>
        )}

        {this.state.pollSubmitted && (
          <Redirect to="/" />
        )}
      </div>
    )
  }
}

function mapStateToProps({ login }) {
  return {
    login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
