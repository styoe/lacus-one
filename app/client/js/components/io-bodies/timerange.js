const React = require('react'),
    { connect } = require('react-redux'),
    {updateIOOptions} = require('../../actions/io'),
    Timepicker = require('../ui/timepicker');

 
const Body = React.createClass({

    updateStart: function(start){
        this.props.data.options.start = start;
        this.props.update(this.props.data.id, this.props.data.options);
    },

    updateEnd: function(end){
        this.props.data.options.end = end;
        this.props.update(this.props.data.id, this.props.data.options);
    },

    render: function() {
        return (
            <div className="io__body timerange">
                <label>From:</label>
                <Timepicker time={this.props.data.options.start} onChange={(start) => this.updateStart(start)}/>
                <label>Until:</label>
                <Timepicker time={this.props.data.options.end} onChange={(end) => this.updateEnd(end)}/>
            </div>
        )
    }
});


const mapStateToProps = (state, ownProps) => {
    return {
        data: ownProps.data,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        update: (id, options) => {
            dispatch(updateIOOptions(id, options));
        }
    }
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(Body);