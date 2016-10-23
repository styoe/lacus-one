const React = require('react'),
    { Scrollbars } = require('react-custom-scrollbars'),
    _ = require('lodash');

const Nr = ({ value, onClick }) => (
    <span onClick={()=>onClick(value)}>{value}</span>
);

const Rangepicker = React.createClass({

    getInitialState: function () {
        return {
            top: this.props.top,
            bottom: this.props.bottom,
            value: this.props.value,
            open: false,
          };
      },

    clickEventCb: function (e) {
        var node = e.target.parentNode;

        while (node != null) {
          if (node == this._domnode) {
            return true;
          }

          node = node.parentNode;
        }

        this.close();
      },

    open: function () {
        this.setState({ open: true });
        window.addEventListener('click', this.clickEventCb);
      },

    close: function () {
        this.setState({ open: false });
        window.removeEventListener('click', this.clickEventCb);
      },

    componentWillUnmount: function () {
        window.removeEventListener('click', this.clickEventCb);
      },

    setValue: function (val) {
        this.setState({ value: val });
        this.props.onChange(val);
      },

    scroll: function (type, direction) {

        const scrollbar = this[type],
            { scrollTop, scrollHeight } = scrollbar.getValues(),
            factor =  direction === 'up' ? -100 : 100;

        scrollbar.scrollTop(scrollTop + factor);
      },

    render: function () {

        var range = [];
        for (var i = this.state.bottom; i <= this.state.top; i++) {
          range.push(<Nr key={i} value={i} onClick={()=>this.setValue(i)} />);
        }

        return (
            <div className='rangepicker' ref={(el) => this._domnode = el} >
                <input onClick={()=> this.open()} type='text' readOnly value={this.state.value} />
                <div className={'rangepicker__dropdown ' + (this.state.open ? 'rangepicker__dropdown--open' : '')}>
                    <div className='rangepicker__dropdown__val'>
                        <div className='rangepicker__dropdown__scrollup' onClick={()=> this.scroll('_h_scroll', 'up')}></div>
                        <Scrollbars ref={(el)=> this._h_scroll = el} style={{ width: 50, height: 100 }}>
                            {range}
                        </Scrollbars>
                        <div className='rangepicker__dropdown__scrolldown' onClick={() => this.scroll('_h_scroll', 'down')}></div>
                    </div>
                </div>
            </div>
        );
      },
  });

module.exports = Rangepicker;
