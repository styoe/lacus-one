const React = require('react'),
    { connect } = require('react-redux'),
    { sortIO, sortIoNoDrag} = require('../actions/io'),
    {openModal} = require('../actions/modals'),
    IOList = require('./io-list'),
    IOLib = require('./io-lib'),
    {DRAG_SORTING} = require('../../conf');

const AddIOButton = React.createClass({
    render: function(){
        return <div className="io io--add">
            <button className="add-btn" onClick={() => this.props.openIoLib(this.props.data)} >+</button>
        </div>
    }
});

const IOContainer = React.createClass({

    getInitialState: function(){
       return{
            is_being_sorted: false,
            sorted_id: null,
            sorted_parent: null
        };
    },

    sortHandleClicked: function(id, parent){

        if(DRAG_SORTING){
            return;
        }

        if( id === this.state.sorted_index){
            this.setState({
                is_being_sorted: false,
                sorted_id: null,
                sorted_parent: null
            });
        }else {
            this.setState({
                is_being_sorted: true,
                sorted_id: id,
                sorted_parent: parent
            });
        }
    },

    sortTargetClicked: function(id, parent){
        if(DRAG_SORTING){
            return;
        } 
        var from = {
                id: this.state.sorted_id,
                parent_id: this.state.sorted_parent
            },
            to = {
                id: id,
                parent_id: parent
            };

        this.props.sortIoNoDrag(from, to);
        this.setState({
            is_being_sorted: false,
            sorted_id: null,
            sorted_parent: null
        });
    },


    render: function () {
        return (
            <div className={"io-container " + (this.state.is_being_sorted ? 'io-container--sortable-active' : '')}>
                <IOList parent={this.props.parent} showSortTarget={this.state.is_being_sorted} sortedId={this.state.sorted_id} sortHandleClicked={this.sortHandleClicked} sortTargetClicked={this.sortTargetClicked}  />
                <AddIOButton openIoLib={this.props.openIoLib} data={this.props.addData} />
            </div>
        )

    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        addData: {
          type: 'component',
          id: ownProps.parent.id
        },
        parent: ownProps.parent
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        openIoLib: (data) => {
            dispatch(openModal(data, IOLib))
        },
        sortIoNoDrag: (from, to) => {
            dispatch(sortIoNoDrag(from, to));
        }
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(IOContainer);

