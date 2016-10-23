const React = require('react'),
    { connect } = require('react-redux'),
    SortableMixin = require('react-mixin-sortablejs'),
    { sortIO } = require('../actions/io'),
    { getSortedFromParent } = require('../util'),
    { DRAG_SORTING } = require('../../conf');

let IO = {};

const ioListMixins = [];

if (DRAG_SORTING) {
  ioListMixins.push(SortableMixin);
}

const IOList = React.createClass({
    getInitialState: function () {
        IO = require('./io');
        return {};
      },

    mixins: ioListMixins,
    sortableOptions: {
        ref: 'ios',
        group: {
            name: 'ios',
            put: ['ios'],
          },
        model: 'ios',
        handle: '.sortable-handle',
        filter: '.io--add',
        onStart: function (e) {
            this.setState({
                from: {
                    index: Array.prototype.indexOf.call(e.from.childNodes, e.item),
                    parentId: e.from.dataset.parentId,
                  },
              });
          },

        onMove: function (e) {
            console.log('onMove', e);
            this.setState({
                dragged: {
                    id: e.dragged.dataset.id,
                    parentId: e.dragged.dataset.parentId,
                  },
                to: {
                    index: Array.prototype.indexOf.call(e.to.childNodes, e.dragged),
                    parentId: e.to.dataset.parentId,
                  },
              });
          },

        onEnd: function (e) {
            this.props.sortIO(this.state.dragged, this.state.from, this.state.to);
          },
      },

    render: function () {

        var sortTarget = '',
            showSortTarget = (this.props.sortedId !== this.props.parent.id) && this.props.showSortTarget ? true : false;

        if (this.props.sortedId && showSortTarget && this.props.ios.length === 0) {
          sortTarget = <div onClick={()=> {this.props.sortTargetClicked(null, this.props.parent.id); } } className='sort-target io-list__sort-target'></div>;
        }

        return (
            <div data-parent-id={this.props.parent.id} className='io-list' ref='ios'>
                {this.props.ios.map((io, i) =>
                    <IO
                        sortData={io.id}
                        key={i}
                        data={io}
                        sortedId={this.props.sortedId}
                        showSortTarget={showSortTarget}
                        sortHandleClicked={this.props.sortHandleClicked}
                        sortTargetClicked={this.props.sortTargetClicked}
                    />
                )}
                {sortTarget}
            </div>
        );
      },

  });

const mapStateToProps = (state, ownProps) => {
    const containerId = ownProps.parent.id,
        ios = getSortedFromParent(state.io, containerId, 'parentId', 'order');

    return {
        parent: ownProps.parent,
        ios: ios,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        sortIO: (dragged, from, to) => {
            return dispatch(sortIO(dragged, from, to));
          },
      };
  };

module.exports = connect(mapStateToProps, mapDispatchToProps)(IOList);

