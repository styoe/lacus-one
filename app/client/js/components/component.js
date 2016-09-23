const React = require('react'),
    { connect } = require('react-redux'),
    {addComponent, removeComponent, toggleComponent, editComponent} = require('../actions/components'),
    {openModal} = require('../actions/modals'),
    ComponentEdit = require('../components/component-edit');



const Component = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    render: function() {

        return (
            <div >
                <div className={"component " + this.props.toggleClass}>
                    <header>
                        <i className="sortable-handle component__sortable-handle" onClick={this.props.sortHandleOnClick}></i>
                        <small>{this.props.data.id}</small>
                        <i onClick={ () => this.props.removeComponent(this.props.data.id) } className="component__remove-btn close-btn"></i>
                    </header>

                    <button className={"component__toggle component__toggle--" + this.props.toggleBtnClass} onClick={ ()=> this.props.toggleComponent(this.props.data.id) }>
                        {this.props.toggleText}
                    </button>

                    <button className="component__edit edit-wrapper" onClick={() => this.props.editComponent(this.props.data)}>
                        {this.props.name}
                    </button>

                    {this.props.sortTarget}
                </div>

            </div>
        )
    }
});

const mapStateToProps = (state, ownProps) => {
    var toggleText = ownProps.data.active ? 'ON' : 'OFF',
        toggleBtnClass = ownProps.data.active ? 'on' : 'of',
        toggleClass = ownProps.data.active ? '' : 'component--disabled';

    return {
        data: ownProps.data,
        name: ownProps.data.name,
        toggleText: toggleText,
        toggleBtnClass: toggleBtnClass,
        toggleClass: toggleClass
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        removeComponent: (id) => {
            dispatch(removeComponent(id))
        },
        toggleComponent: (id) => {
            dispatch(toggleComponent(id))
        },
        editComponent: (component) => {
            dispatch(openModal(component, ComponentEdit))
        }
    }
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(Component);

