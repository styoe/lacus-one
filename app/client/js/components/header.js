const React = require('react'),
    { connect } = require('react-redux'),
    Clock = require('./ui/clock'),
    WifiEdit = require('./wifi-edit'),
    {openModal} = require('../actions/modals');


const Header = ({app, openWifiModal}) => (
    <header className="main-header">
        <div className="main-header__logo"></div>
        <div className="main-header__wifi" onClick={() => openWifiModal()}></div>
        <div className="main-header__clock"><Clock /></div>
        <div className="main-header__temperature">{app.temperature} C°</div>
        <div className="main-header__humidity">{app.humidity} %<small>RH</small></div>
    </header>
);


const mapStateToProps = (state) => {
    return {
        app : state.app
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        openWifiModal: function(){
            dispatch(openModal({}, WifiEdit));
        }
    }
};


const BoundHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

module.exports = BoundHeader;
