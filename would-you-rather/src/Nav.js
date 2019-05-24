import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: '',
      isLoggedIn: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function() {
      if (this.state.loginUser.length) {
        // change state to logged in
        console.log('user is logged in');
      }
    });
  }

  render() {
    //const post = this.props.post
    return (
      <div className="header title">
        <div className="header-main">
          <h2><Link to="/" className="header-main">Would You Rather</Link></h2>
          <select value={this.state.loginUser} onChange={this.onChangeHandler} name="loginUser">
            <option value="">Login</option>
            <option value="sarahedo">Sarah Edo</option>
            <option value="tylermcginnis">Tyler McGinnis</option>
            <option value="johndoe">John Doe</option>
          </select>
        </div>
        <div className="header-contact ">
          <p className="contact">
            <Link to="/">Questions</Link>
            <Link to="/Leaderboard">Leaderboard</Link>
            <span>User-name and Logout</span>
            <span>Select list for user names</span>
          </p>
          
        </div>


      </div>
    )
  }
}

export default Nav;
