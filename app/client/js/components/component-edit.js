const React = require('react'),
    { connect } = require('react-redux'),
    { updateComponent} = require('../actions/components'),
    IOContainer = require('./io-container'),
    {Keyboard} = require('../util'),
    _ = require('lodash');

const ComponentEdit = React.createClass({
    getInitialState: function(){
        return{
            id: this.props.component.id,
            name: this.props.component.name
        }
    },

    updateName: function(new_state){
        this.setState({name:new_state});
        _.debounce(()=>this.props.update(this.state.id, this.state.name), 500)();
    },

    render: function() {
        return <div className="component-edit">
            <Keyboard
                value={ this.state.name }
                name='componentname'
                onChange={this.updateName} />
            <IOContainer parent={this.props.component} />
        </div>
    }
});



// const ComponentEdit = React.createClass({
//     getInitialState: function(){
//         return{
//             id: this.props.component.id,
//             name: this.props.component.name
//         }
//     },
//
//     updateName: function(new_state){
//         this.setState({name:new_state});
//         _.debounce(()=>this.props.update(this.state.id, this.state.name), 500)();
//     },
//
//     render: function() {
//         var display = {
//             'bksp'   :  "\u2190",
//             'accept' : 'OK',
//             'normal' : 'ABC',
//             'meta1'  : '.?123',
//             'meta2'  : '#+=',
//             'enter'  : 'ENTER'
//         };
//
//         var customLayout = {
//             'normal': [
//                 'q w e r t y u i o p {bksp}',
//                 'a s d f g h j k l {enter}',
//                 'z x c v b n m , . {s}',
//                 '{meta1} {space} {accept}'
//             ],
//                 'shift': [
//                 'Q W E R T Y U I O P {bksp}',
//                 'A S D F G H J K L {enter}',
//                 'Z X C V B N M ! ? {s}',
//                 '{meta1} {space} {accept}'
//             ],
//                 'meta1': [
//                 '1 2 3 4 5 6 7 8 9 0 {bksp}',
//                 '- / : ; ( ) \u20ac & @ {enter}',
//                 '. , ? ! \' " {meta2}',
//                 '{normal} {space} {accept}'
//             ],
//                 'meta2': [
//                 '[ ] { } # % ^ * + = {bksp}',
//                 '_ \\ | ~ < > $ \u00a3 \u00a5 {enter}',
//                 '. , ? ! \' " {meta1}',
//                 '{normal} {space} {accept}'
//             ]
//         };
//
//         return <div className="component-edit">
//                 <Keyboard
//                     value={ this.state.name }
//                     name='componentname'
//                     options={{type:'input', layout:'custom', customLayout: customLayout, display: display, autoAccept: true, alwaysOpen: false, appendLocally: true, color:'light', updateOnChange: true }}
//                     onChange={this.updateName} />
//                 <IOContainer parent={this.props.component} />
//             </div>
//     }
// });

// <input className="component-edit__name" type="text" value={this.state.name} onChange={this.updateName} />

const mapStateToProps = (state, ownProps) => {
    return {
        component: ownProps.data
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        update: (id, name) => {
            dispatch(updateComponent(id, name))
        }
    }
};


const BoundComponentEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentEdit);

module.exports = BoundComponentEdit;
