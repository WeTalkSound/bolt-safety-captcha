import React, { Component } from 'react'

export default class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            scores: [],
            error: ""
        }
    }

    componentDidMount() {
        console.log("Showing Scores")
        fetch(`https://bolt-campaigns.firebaseio.com/bolt-safety-captcha/high-scores.json?orderBy=%22country%22&endAt=%22${this.props.country}%22&limitToLast=${this.props.limit}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let scores = data
                scores = Object.values(scores).sort((a,b) => (a.score < b.score) ? 1: -1)
                this.setState({ scores, error: "" })
            })
            .catch(error => {
              fetch(`https://us-central1-bolt-campaigns.cloudfunctions.net/boltCaptchaFilterHighScores?limit=${this.props.limit}&country=${this.props.country}`, {
                  method: 'GET'
              })
                  .then(res => res.json())
                  .then(data => {
                      console.log(data)
                      let scores = data
                      scores = Object.values(scores).sort((a,b) => (a.score < b.score) ? 1: -1)
                      this.setState({ scores, error: "" })
                  })
                  .catch(error => {
                    fetch(`https://us-central1-bolt-campaigns.cloudfunctions.net/boltCaptchaAlsoFilterHighScores?limit=${this.props.limit}&country=${this.props.country}`, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            let scores = data
                            scores = Object.values(scores).sort((a,b) => (a.score < b.score) ? 1: -1)
                            this.setState({ scores, error: "" })
                        })
                  })
                })
    }
    render() {
        const error = <div className="col-12">{this.state.error}</div>
        const scores = (
            <div className="col-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Category</th>
                            <th scope="col">Time</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.scores.map((item, key) => {
                                return (
                                    <tr key={ key }>
                                        <th scope="row">{ key + 1 }</th>
                                        <td>{ item.name }</td>
                                        <td>{ item.country }</td>
                                        <td>{ item.category }</td>
                                        <td>{ item.time }</td>
                                        <td>{ item.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        )
        return (
            <div className="col-12 text-center">
                <h2 className="text-center">The Top { this.props.limit }</h2>
                {this.state.error.length ? error : scores}
                <a href="/" className="btn btn-primary">Back</a>
            </div>
        )
    }
}