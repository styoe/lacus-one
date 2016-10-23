var React = require('react'),
    { connect } = require('react-redux'),
    { closeModal } = require('../actions/modals'),
    { Scrollbars } = require('react-custom-scrollbars');

// { this.props.children }
const Modal = ({ data, tpl, close, last, dimensions }) => (
    <div className={'modal ' + (last ? 'modal--last' : '')}>
        <div className='modal__overlay'></div> 
        <div className='modal__content'>
            <Scrollbars style={{ width: dimensions.width, height: dimensions.height }}>
                { React.createElement(tpl, { data: data, closeModal: close }) }
            </Scrollbars>
            <button className='modal__close close-btn' onClick={()=> close() }> </button>
        </div>
    </div>
);

const ModalsList = ({ modals, close, dimensions }) => (
    <div>{modals.map((modal, i) =>
        <Modal
            key={modal.id}
            data={modal.data}
            tpl={modal.tpl}
            close={close.bind(this, modal.id)}
            last={modals.length - 1 === i ? true : false}
            dimensions={dimensions}
        />
    )}
    </div>
);

const ModalsWrapper = ({ modals, active, dimensions,  close }) => (
    <div className={'modals-wrapper ' + active}>
        <div className='modal-overlay'></div>
        <ModalsList
            modals={modals}
            close={close}
            dimensions={dimensions}
        />
    </div>
);

const mapStateToProps = (state) => {
    // Remove modal if no tpl is set
    let active = state.modals.length ? 'modals-wrapper--active' : '',
        dimensions = {
            width: state.app.width > 500 ? 500 : state.app.width * 0.9,
            height: state.app.height * 0.9,
          };
    return {
        modals: state.modals,
        dimensions: dimensions,
        active: active,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        close: (id) => {
            dispatch(closeModal(id));
          },
      };
  };

const BoundModalsWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalsWrapper);

module.exports = BoundModalsWrapper;
