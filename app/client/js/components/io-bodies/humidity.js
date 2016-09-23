const React = require('react'),
    { connect } = require('react-redux'),
    {updateIOOptions} = require('../../actions/io'),
    Rangeselect = require('../ui/range-select');

// import TimePicker from 'rc-time-picker';
 
const Body = React.createClass({

    updateValue: function(val){
        this.props.data.options.value = val;
        this.props.update(this.props.data.id, this.props.data.options);
    },

    updateType: function(val){
        this.props.data.options.type = val;
        this.props.update(this.props.data.id, this.props.data.options);
    },

    render: function() {
        return (
            <div className="io__body humidity">
                <label>is</label>
                <select onChange={(e) => this.updateType(e.target.value)} value={this.props.data.options.type}>
                    <option value="<">{"LESS"}</option>
                    <option value=">">{"GREATER"}</option>
                </select>
                <label>than</label>
                <Rangeselect value={this.props.data.options.value} top={100} bottom={1} onChange={(val) => this.updateValue(val)}/>
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