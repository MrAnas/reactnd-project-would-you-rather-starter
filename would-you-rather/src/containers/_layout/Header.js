import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  static propTypes = {

  }

  render() {
    return (
      <ul class="nav nav-dark">
  <li class="nav-item">
    <a class="nav-link active" href="#">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">New Question</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Leader Board</a>
  </li>
  <li class="nav-item">
    Hello Anas
    <a class="nav-link" href="#">Logout</a>
  </li>
</ul>
    )
  }
}

export default Header
