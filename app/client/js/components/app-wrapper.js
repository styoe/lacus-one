const React = require('react'),
    { connect } = require('react-redux'),
    ComponentsApp = require('./components-app'),
    Modals = require('./modals'),
    Header = require('./header'),
    {setLoadingState, saveAppState} = require('../actions/app'),
    { Scrollbars } = require('react-custom-scrollbars');

const AppWrapper = ({modalsExist, app}) => (
    <section className={"main-app-wrapper " + (modalsExist ? 'main-app-wrapper--modal-open' : '')}>
        <div className="main-content-wrapper">
            <Scrollbars style={{width: app.width, height: app.height}}>
                <Header />
                <ComponentsApp />
            </Scrollbars>
        </div>
        <Modals />
    </section>
);


const mapStateToProps = (state) => {
    return {
        app: state.app,
        modalsExist : state.modals.length > 0
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingState: () => {
            dispatch(setLoadingState())
        },
        saveAppState: (state) => {
            dispatch(saveAppState(state))
        }
    }
};


const BoundAppWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppWrapper);

module.exports = BoundAppWrapper;

