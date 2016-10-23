const React = require('react'),
    ComponentsList = require('./components-list'),
    { connect } = require('react-redux');

const ComponentsApp = ({ components, addComponent, removeComponent, toggleComponent, editComponent }) => (
    <div className='components-wrapper'>
        <ComponentsList/>
    </div>
);

const mapStateToProps = (state) => {
    return {};
  };

const mapDispatchToProps = (dispatch) => {
    return {};
  };

const BoundComponentsApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentsApp);

module.exports = BoundComponentsApp;
