const React = require('react'),
    { connect } = require('react-redux'),
    IOList = require('../io-list');

const Body = React.createClass({
    render: function () {
        return (
            <div className='io__body'>
                <IOList parent={this.props.data}
                    sortedId={this.props.sortedId}
                    showSortTarget={this.props.showSortTarget}
                    sortHandleClicked={this.props.sortHandleClicked}
                    sortTargetClicked={this.props.sortTargetClicked} />
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
