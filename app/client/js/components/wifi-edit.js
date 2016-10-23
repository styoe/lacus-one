const React = require('react'),
    { connect } = require('react-redux'),
    _ = require('lodash'),
    {openModal} = require('../actions/modals'),
    {getWifis, connectToWifi} = require('../actions/app'),
    {Keyboard} = require('../util');


const WifiPasswordModal = React.createClass({
    getInitialState: function(){
        console.log(this.props);
        return{
            wifi: this.props.data.wifi,
            password: ''
        }
    },
    updatePassword: function(val){
        this.setState({
            password: val
        })
    },
    connect: function(){

        const data = {
            wifi: this.state.wifi,
            password: this.state.password
        }
        
        this.props.data.connectToWifi(data);

    },
    render: function(){
        return <div class="wifi-password-wrapper">
            <Keyboard
                value={ this.state.password }
                name='wifipassword'
                onChange={(val)=>this.updatePassword(val)} />
            <button className="btn" onClick={()=> this.connect()}>Connect</button>
        </div>
    }
});

const WifiEdit = React.createClass({
    getInitialState: function(){
        return{
        }
    },
    render: function() {
        return <div className="wifi-edit">
            {
                this.props.wifis.map((wifi, i)=> (
                    <div key={i} className="wifi-edit__wifi">{wifi.ssid} <button onClick={()=>this.props.enterPassword(wifi)}>Connect</button></div>
                ) )
            }

            <button className="btn" onClick={()=>this.props.getWifis()}>Refresh</button>
        </div>
    }
});


const mapStateToProps = (state) => {
    return {
        wifis: state.app.wifis
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        getWifis: () => {
            dispatch(getWifis());
        },
        enterPassword: (wifi)=>{
            console.log('enterPassword');

            const props = {
                wifi: wifi,
                connectToWifi: (data) => {
                    dispatch(connectToWifi(data));
                }
            };

            dispatch(openModal(props, WifiPasswordModal ));
        }
    }
};


const BoundWifiEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(WifiEdit);

module.exports = BoundWifiEdit;
