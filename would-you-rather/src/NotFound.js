import React, { Component } from 'react';


class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    // this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className="">
        <h2>404 Error</h2>
        <p>that page could not be found.</p>
      </div>
    )
  }
}

export default NotFound;