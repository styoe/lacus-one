const React = require('react');
import Keyboard from 'react-virtual-keyboard';

const KeyboardInput = ({value, name, onChange, type='input'}) => {

    var options = {
        type: type,
        layout: 'custom',
        customLayout: {
            'normal': [
                'q w e r t y u i o p {bksp}',
                'a s d f g h j k l {enter}',
                'z x c v b n m , . {s}',
                '{meta1} {space} {accept}'
            ],
            'shift': [
                'Q W E R T Y U I O P {bksp}',
                'A S D F G H J K L {enter}',
                'Z X C V B N M ! ? {s}',
                '{meta1} {space} {accept}'
            ],
            'meta1': [
                '1 2 3 4 5 6 7 8 9 0 {bksp}',
                '- / : ; ( ) \u20ac & @ {enter}',
                '. , ? ! \' " {meta2}',
                '{normal} {space} {accept}'
            ],
            'meta2': [
                '[ ] { } # % ^ * + = {bksp}',
                '_ \\ | ~ < > $ \u00a3 \u00a5 {enter}',
                '. , ? ! \' " {meta1}',
                '{normal} {space} {accept}'
            ]
        },
        display: {
            'bksp': "\u2190",
            'accept': 'OK',
            'normal': 'ABC',
            'meta1': '.?123',
            'meta2': '#+=',
            'enter': 'ENTER'
        },
        autoAccept: true,
        alwaysOpen: false,
        appendLocally: true,
        color: 'light',
        updateOnChange: true
    }

    return <Keyboard
            value={value}
            name={name}
            options={options}
            onChange={onChange} />
};


const getSortedFromParent= function(list, parent, parentKey, orderKey){

    let new_list = list.reduce(function(acc, item){
        if(item[parentKey] === parent){
            acc.push(item);
        }
        return acc;
    }, []);

    return new_list.sort((a, b) => a[orderKey] - b[orderKey]);

};


module.exports = {
    getSortedFromParent: getSortedFromParent,
    Keyboard: KeyboardInput
}