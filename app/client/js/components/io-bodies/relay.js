const React = require('react'),
    { connect } = require('react-redux');

const Body = React.createClass({
    render: function () {
        return (
            <div className='io__body'>
            </div>
        );
      },
  });

const mapStateToProps = (state, ownProps) => {
    return {
        data: ownProps.data,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {};
  };

module.exports = connect(mapStateToProps, mapDispatchToProps)(Body);
