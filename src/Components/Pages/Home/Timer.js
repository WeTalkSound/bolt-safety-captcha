import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Timer.css'

export default class Timer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.props.date)
            date ? this.setState(date) : this.stop()
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    calculateCountdown = (endDate) => {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        //clear countdown when date hits
        if (diff <= 0) {
          console.log("Here is false")
          return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millisec: 0,
        }

        //calculate difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.minutes = Math.floor(diff / 60);
            diff -= timeLeft.minutes * 60;
        }
        timeLeft.seconds = diff;

        return timeLeft;
    }

    stop = () => {
      clearInterval(this.interval);
      this.props.onEnd();
    }

    addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    }

    render() {
        const countDown = this.state;

        return (
            <section className="countdown">
                {/* <span className="countdown__col">
                    <span className="countdown__col-element">
                        <p><strong className="dashboard-card__title-text">{this.addLeadingZeros(countDown.days)}</strong></p>
                        <p><small className="dashboard-card__body-text">Days</small></p>
                    </span>
                </span>
                <span className="countdown__col">
                    <span className="countdown__col-element">
                        <p><strong className="dashboard-card__title-text">{this.addLeadingZeros(countDown.hours)}</strong></p>
                        <p><small className="dashboard-card__body-text">Hours</small></p>
                    </span>
                </span> */}
                <span className="countdown__col">
                    <span className="countdown__col-element">
                        <p><strong className="dashboard-card__title-text">{this.addLeadingZeros(countDown.minutes)}</strong></p>
                        <p><small className="dashboard-card__body-text">Minutes</small></p>
                    </span>
                </span>
                <span className="countdown__col">
                    <span className="countdown__col-element">
                        <p><strong className="dashboard-card__title-text">{this.addLeadingZeros(countDown.seconds)}</strong></p>
                        <p><small className="dashboard-card__body-text">Seconds</small></p>
                    </span>
                </span>
            </section>
        )
    }
}

Timer.propTypes = {
    date: PropTypes.number.isRequired
}

Timer.defaultProps = {
    date: new Date()
}