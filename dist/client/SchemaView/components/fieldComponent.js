// component responsible for rendering and modifying each field
import utilityFunctions from '../../../utilities/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteSchemaField, toggleRequired, isArrayChange, } from '../../store/slices/schemaSlice';
export default function FieldComponent(_a) {
    var objectKey = _a.objectKey, objectValue = _a.objectValue;
    var dispatch = useDispatch();
    var schemas = useSelector(function (state) { return state.schemaSlice.schemaFields; });
    var _b = useState(false), active = _b[0], setActive = _b[1];
    var handleClick = function () {
        setActive(!active);
        dispatch(isArrayChange({ objectKey: objectKey }));
    };
    var snakeToCamel = utilityFunctions.snakeToCamel;
    var arrayOfOptions = [];
    var types = ['String', 'Int', 'Boolean', 'Float', 'Array', 'Object'];
    types.forEach(function (type) {
        if (type === objectValue.value) {
            arrayOfOptions.push(React.createElement("option", { value: type, selected: true }, type));
        }
        else {
            arrayOfOptions.push(React.createElement("option", { value: type }, type));
        }
    });
    return (React.createElement("div", { className: 'pl-8 pt-1 pb-1 font-monospace flex flex-row justify-center' },
        React.createElement("span", { className: 'text-vscode-cyan basis-24', contentEditable: 'true' }, snakeToCamel(objectKey)),
        React.createElement("span", { className: 'pr-4' }, ":"),
        React.createElement("select", { className: 'text-vscode-green bg-transparent border-b-2 border-desert-ash mr-4' }, arrayOfOptions),
        React.createElement("span", { className: 'mr-20' }, schemas[objectKey].requiredOption ? React.createElement("span", { className: 'text-white' }, '!') : React.createElement("span", { className: 'text-transparent' }, '.')),
        React.createElement("button", { className: 'bg-midnight-glaucous hover:bg-midnight-glaucousDark rounded-md pl-2 pr-2 mr-2', onClick: function () { return dispatch(toggleRequired({ objectKey: objectKey })); } }, "required"),
        React.createElement("button", { className: 'pl-2 pr-2 rounded-md bg-colorHunt-quatrinary hover:bg-colorHunt-quatrinaryDark', onClick: function () { return dispatch(deleteSchemaField({ objectKey: objectKey })); } }, "delete")));
}
//# sourceMappingURL=fieldComponent.js.map