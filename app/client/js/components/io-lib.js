const React = require('react'),
    { connect } = require('react-redux'),
    { addIO } = require('../actions/io'),
    _ = require('lodash');

const IOLib = React.createClass({

    render: function () {
        return (
            <div className='io-lib'>
                {this.props.ioLib.map((io, i) => (
                    <div key={i}
                         className='io-lib__item'
                         onClick={()=> {
                            this.props.addIO(io, this.props.data);
                            this.props.closeModal();
                         }}>
                        {io.name}
                    </div>
                    )
                )}
            </div>
        );
      },
  });

const mapStateToProps = (state, ownProps) => {

    console.log(state);

    return {
        data: ownProps.data,
        closeModal: ownProps.closeModal,
        ioLib: state.ioLib,
      };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        addIO: (io, parent) => {
            dispatch(addIO(io, parent));
          },
      };
  };

const BoundIOLib = connect(
    mapStateToProps,
    mapDispatchToProps
)(IOLib);

module.exports = BoundIOLib;
