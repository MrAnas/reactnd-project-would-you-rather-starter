import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Leaderboard extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <div class="media border border-primary mb-2 p-2">
                    <img class="mr-3" src="" alt="Generic placeholder image" />
                    <div class="media-body text-left">
                        <h5 class="mt-0">Anas AlBassam</h5>
                        <h5 class="text-success">Score: 10</h5>
                        <p>Questions Answered: <span class="text-primary">10</span></p>
                        <hr />
                        <p>Questions Created: <span class="text-primary">10</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard
