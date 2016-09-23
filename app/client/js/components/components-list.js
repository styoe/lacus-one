const React = require('react'),
    Component = require('./component'),
    SortableMixin = require('react-mixin-sortablejs'),
    {connect} = require('react-redux'),
    {addComponent, sortComponents} = require('../actions/components'),
    {DRAG_SORTING} = require('../../conf');

const componentListMixins = [];

if( DRAG_SORTING ){
    componentListMixins.push(SortableMixin)
}

const AddComponentButton = React.createClass({
    render: function(){
        return <div className="component component--add">
            <button className="add-btn" onClick={() => this.props.addComponent()} >+</button>
        </div>
    }
});

const ComponentsList = React.createClass({
    mixins: componentListMixins,

    // THIS IS USED BY THE SortableMixin ONLY IF DRAG_SORTING IS TRUE
    sortableOptions: {
        ref: "components",
        group: "components",
        model: "components",
        handle: ".sortable-handle",
        filter: ".component--add",
        onStart: function(e){
            let from= Array.prototype.indexOf.call(e.from.childNodes, e.item);
            this.setState({from: from});
        },
        onMove: function (e) {
            let to = Array.prototype.indexOf.call(e.from.childNodes, e.dragged);
            this.setState({to: to});
        },
        onEnd: function(e){
            this.props.sortComponents(this.state.from, this.state.to);
        }
    },

    getInitialState: function(){

        return{
            is_being_sorted: false,
            sorted_index: null
        }

    },

    // THIS IS USED ONLY IF DRAG_SORTING IS DISABLED
    sortHandleClicked: function(i){

        if( i === this.state.sorted_index){
            this.setState({
                is_being_sorted: false,
                sorted_index: null
            });
        }else{
            this.setState({
                is_being_sorted: true,
                sorted_index: i
            });
        }


    },

    sortTargetClicked: function(i){
        this.props.sortComponents(this.state.sorted_index, i);
        this.setState({
            is_being_sorted: false,
            sorted_index: null
        });
    },

    render: function () {
        return (
            <div className={"components-list " + (this.state.is_being_sorted ? 'sortable-active': '')} ref="components">
                {this.props.components.map((component, i) =>{
                    var sortTarget = '';
                    if(!DRAG_SORTING && this.state.is_being_sorted ){
                        sortTarget = <div onClick={()=>{this.sortTargetClicked(i);} } className="sort-target components-list__sort-target"></div>
                    }

                    return (
                        <Component
                            sortData={component.id}
                            sortTarget={sortTarget}
                            sortHandleOnClick={()=>this.sortHandleClicked(i)}
                            index={i}
                            key={component.id}
                            data={component}
                        />
                    )
                })}

                <AddComponentButton addComponent={this.props.addComponent} />
            </div>
        )
    }
});

const mapStateToProps = (state) => {
    return {
        components: state.components
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        addComponent: () => {
            dispatch(addComponent());
        },
        sortComponents: (from, to) => {
            dispatch(sortComponents(from, to));
        }
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ComponentsList);


