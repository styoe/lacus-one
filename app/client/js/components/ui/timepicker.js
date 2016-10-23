const React = require('react'),
    { Scrollbars } = require('react-custom-scrollbars'),
    _ = require('lodash');

const Nr = ({ value, onClick }) => (
    <span onClick={()=>onClick(value)}>{value}</span>
);

const Timepicker = React.createClass({

    getInitialState: function () {
        return {
            time: this.props.time,
            type: this.props.type || 'input',
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

    setHour: function (h) {
        let time = {
            h: h,
            m: this.state.time.m,
          };

        this.setState({ time: time });
        this.props.onChange(time);
      },

    setMinutes: function (m) {
        let time = {
            h: this.state.time.h,
            m: m,
          };

        this.setState({ time: time });
        this.props.onChange(time);
      },

    scroll: function (type, direction) {

        const scrollbar = this[type],
            { scrollTop, scrollHeight } = scrollbar.getValues(),
            factor =  direction === 'up' ? -100 : 100;

        scrollbar.scrollTop(scrollTop + factor);
      },

    render: function () {

        var h = [];
        for (var i = 0; i < 24; i++) {
          let hour = _.padStart(i, 2, '0');
          h.push(<Nr key={i} value={hour} onClick={()=>this.setHour(hour)} />);
        }

        var m = [];
        for (var i = 0; i < 60; i++) {
          let min = _.padStart(i, 2, '0');
          m.push(<Nr key={i} value={min} onClick={()=>this.setMinutes(min)} />);
        }

        return (
            <div className='timepicker' ref={(el) => this._domnode = el} >
                <input onClick={()=> this.open()} type='text' readOnly value={this.state.time.h + ':' + this.state.time.m} />
                <div className={'timepicker__dropdown ' + (this.state.open ? 'timepicker__dropdown--open' : '')}>
                    <div className='timepicker__dropdown__h'>
                        <div className='timepicker__dropdown__scrollup' onClick={()=> this.scroll('_h_scroll', 'up')}></div>
                        <Scrollbars ref={(el)=> this._h_scroll = el} style={{ width: 50, height: 100 }}>
                            {h}
                        </Scrollbars>
                        <div className='timepicker__dropdown__scrolldown' onClick={() => this.scroll('_h_scroll', 'down')}></div>
                    </div>
                    <div className='timepicker__dropdown__m'>
                        <div className='timepicker__dropdown__scrollup' onClick={() => this.scroll('_m_scroll', 'up')}></div>
                        <Scrollbars ref={(el)=> this._m_scroll = el} style={{ width: 50, height: 100 }}>
                            {m}
                        </Scrollbars>
                        <div className='timepicker__dropdown__scrolldown' onClick={ () => this.scroll('_m_scroll', 'down')}></div>
                    </div> 
                </div>

            </div>

        );
      },
  });

module.exports = Timepicker;
