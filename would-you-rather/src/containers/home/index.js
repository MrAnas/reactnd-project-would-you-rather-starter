import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Unanswered Questions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Answered Questions</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div id="accordion">
                            <div class="card mb-3">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Question by: Anas AlBassam
        </button>
                                    </h5>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="media">
                                            <img class="mr-3" src="..." alt="Generic placeholder image"/>
                                                <div class="media-body">
                                                    <h5 class="mt-0">Would you rather</h5>
                                                    <p>..Front end..</p>
                                                    <button class="btn btn-outline-primary">
                                                        
                                                        View Poll
    </button>  
    </div>
</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        </div>
                    </div>


                </div>
                )
            }
        }
        
        export default Home
