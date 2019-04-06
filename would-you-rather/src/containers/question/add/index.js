import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddQuestion extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div class="card">
        <article class="card-body">
          <h4 class="card-title mb-4 mt-1">Create New Question</h4>
          <form>
            <div class="form-group">
              <p>Complete The Question:</p>
              <h5>Would you Rather</h5>
              <input name="" class="form-control" placeholder="Enter Option one here" type="text" />
            </div>
            Or
            <hr/>
            <div class="form-group">
              <input class="form-control" placeholder="Enter Option Two here" type="text" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block"> Submit  </button>
            </div>
          </form>
        </article>
      </div>
    )
  }
}

export default AddQuestion
