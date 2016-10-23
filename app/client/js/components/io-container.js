const React = require('react'),
    { connect } = require('react-redux'),
    { sortIO, sortIoNoDrag } = require('../actions/io'),
    { openModal } = require('../actions/modals'),
    IOList = require('./io-list'),
    IOLib = require('./io-lib'),
    { DRAG_SORTING } = require('../../conf');

const AddIOButton = React.createClass({
    render: function () {
        return <div className='io io--add'>
            <button className='add-btn' onClick={() => this.props.openIoLib(this.props.data)} >+</button>
        </div>;
      },
  });

const IOContainer = React.createClass({

    getInitialState: function () {
      return {
          isBeingSorted: false,
          sortedId: null,
          sortedParent: null,
        };
    },

    sortHandleClicked: function (id, parent) {

        if (DRAG_SORTING) {
          return;
        }

        if (id === this.state.sortedIndex) {
          this.setState({
              isBeingSorted: false,
              sortedId: null,
              sortedParent: null,
            });
        }else {
          this.setState({
              isBeingSorted: true,
              sortedId: id,
              sortedParent: parent,
            });
        }
      },

    sortTargetClicked: function (id, parent) {
        if (DRAG_SORTING) {
          return;
        }

        var from = {
                id: this.state.sortedId,
                parentId: this.state.sortedParent,
              },
            to = {
                id: id,
                parentId: parent,
              };

        this.props.sortIoNoDrag(from, to);
        this.setState({
            isBeingSorted: false,
            sortedId: null,
            sortedParent: null,
          });
      },

    render: function () {
        return (
            <div className={'io-container ' + (this.state.isBeingSorted ? 'io-container--sortable-active' : '')}>
                <IOList parent={this.props.parent} showSortTarget={this.state.isBeingSorted} sortedId={this.state.sortedId} sortHandleClicked={this.sortHandleClicked} sortTargetClicked={this.sortTargetClicked}  />
                <AddIOButton openIoLib={this.props.openIoLib} data={this.props.addData} />
            </div>
        );

      },
  });

const mapStateToProps = (state, ownProps) => {
    return {
        addData: {
          type: 'component',
          id: ownProps.parent.id,
        },
        parent: ownProps.parent,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        openIoLib: (data) => {
            dispatch(openModal(data, IOLib));
          },

        sortIoNoDrag: (from, to) => {
            dispatch(sortIoNoDrag(from, to));
          },
      };
  };

module.exports = connect(mapStateToProps, mapDispatchToProps)(IOContainer);

