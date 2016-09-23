const React = require('react'),
      ReactDOM = require('react-dom'),
      { Provider } =  require('react-redux'),
      AppWrapper = require('./components/app-wrapper'),
      store = require('./store');

ReactDOM.render(
    <Provider store={store}>
       <AppWrapper />
    </Provider>,

    document.getElementById('app')
);


