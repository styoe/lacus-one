const React = require('react'),
    { connect } = require('react-redux'),
    {removeIO, editIO} = require('../actions/io'),
    {openModal} = require('../actions/modals'),
    ioEdit = require('../components/component-edit');

let IOBody = {};

const IO = React.createClass({
    render: function() {
        var sortTarget = '',
            showSortTarget = (this.props.sortedId !== this.props.data.parent_id) && this.props.showSortTarget ? true : false;

        if(showSortTarget){
            sortTarget = <div onClick={()=>{this.props.sortTargetClicked(this.props.data.id, this.props.data.parent_id); } } className="sort-target io__sort-target"></div>
        }

        return (
            <div data-id={this.props.data.id} data-parent-id={this.props.data.parent_id} className={"io io--" + this.props.data.type + ' ' + this.props.toggleClass}>
                <header>
                    <i className="sortable-handle io__sortable-handle" onClick={()=>this.props.sortHandleClicked(this.props.data.id, this.props.data.parent_id)}></i>
                    <small className="io__id">{this.props.data.id}</small>
                    <i onClick={ () => this.props.removeIO(this.props.data.id) } className="io__remove-btn close-btn"></i>
                    <button className="io__edit">
                        {this.props.name}
                    </button>
                </header>
                <IOBody data={this.props.data}
                    sortedId={this.props.sortedId}
                    showSortTarget={showSortTarget}
                    sortHandleClicked={this.props.sortHandleClicked}
                    sortTargetClicked={this.props.sortTargetClicked}
                />
                {sortTarget}
            </div>
        )
    }
});


const mapStateToProps = (state, ownProps) => {
    IOBody = require('./io-bodies/'+ownProps.data.type);

    let toggleText = '',
        toggleClass = '';

    return {
        index: ownProps.index,
        data: ownProps.data,
        name: ownProps.data.name,
        toggleText: toggleText,
        toggleClass: toggleClass
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        removeIO: (id) => {
            dispatch(removeIO(id))
        },
        editIO: (io) => {
            console.log('edit IO');
            dispatch(openModal(io, ioEdit))
        }
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(IO);