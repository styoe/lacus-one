const React = require('react');

var Clock = React.createClass({

    getInitialState: function () {
        return { time: 0 };
      },

    componentDidMount: function () {
        this.timer = setInterval(this.tick, 50);
      },

    componentWillUnmount: function () {
        clearInterval(this.timer);
      },

    tick: function () {
        let d = new Date();
        this.setState({ time: d.getHours() + ' : ' + d.getMinutes() });
      },

    render: function () {
        return <time>{this.state.time}</time>;
      },
  });

module.exports = Clock;
