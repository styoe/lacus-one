const React = require('react'),
    { connect } = require('react-redux'),
    { updateComponent } = require('../actions/components'),
    IOContainer = require('./io-container'),
    { Keyboard } = require('../util'),
    _ = require('lodash');

const ComponentEdit = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.component.id,
            name: this.props.component.name,
          };
      },

    updateName: function (newState) {
        this.setState({ name: newState });
        _.debounce(()=>this.props.update(this.state.id, this.state.name), 500)();
      },

    render: function () {
        return <div className='component-edit'>
            <Keyboard
                value={ this.state.name }
                name='componentname'
                onChange={this.updateName} />
            <IOContainer parent={this.props.component} />
        </div>;
      },
  });

const mapStateToProps = (state, ownProps) => {
    return {
        component: ownProps.data,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        update: (id, name) => {
            dispatch(updateComponent(id, name));
          },
      };
  };

const BoundComponentEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentEdit);

module.exports = BoundComponentEdit;
