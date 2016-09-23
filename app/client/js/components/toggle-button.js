const ToggleButton = ({data, toggleComponent}) => (
    <button className="component__toggle" onClick={ ()=> toggleComponent() }>
    </button>
);

module.exports = ToggleButton;