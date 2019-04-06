import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Question extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <div class="media border border-primary mb-2 p-2">
                    <img class="mr-3" src="..." alt="Generic placeholder image" />
                    <div class="media-body text-left">
                        <h5 class="mt-0">Would you rather:</h5>
                        <div class="radio">
                            <label>
                                <input class="mr-2" type="radio" name="optradio" checked />
                                Option 1
                                    </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input class="mr-2" type="radio" name="optradio" />
                                Option 2
                                    </label>
                        </div>

                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
                <div class="media border border-primary mb-2 p-2">
                    <img class="mr-3" src="..." alt="Generic placeholder image" />
                    <div class="media-body text-left">
                        <h5 class="mt-0">Would you rather:</h5>
                        <div class="">
                            <label>
                                Option 1 <b>"1 out of 2 votes"</b>
                            </label>
                        </div>
                        <div class="border border-success">
                            <label>
                                Option 2 <b>"1 out of 2 votes"</b>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question
