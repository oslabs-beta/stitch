// component for changing schema type and name
import { useSelector, useDispatch } from 'react-redux';
import { setTypeName } from '../../store/slices/schemaSlice';
export default function TypeComponent() {
    var dispatch = useDispatch();
    var currName = '';
    var handleChange = function (e) {
        currName = e.target.value;
    };
    return (React.createElement("div", { className: 'pl-8' },
        React.createElement("span", { className: 'pr-4' }, "Type:"),
        React.createElement("input", { className: ' decoration-desert-ash rounded-md bg-colorHunt-tertiary pl-4 placeholder:italic focus:outline-none', type: 'text', onChange: handleChange }),
        React.createElement("button", { className: 'rounded-md bg-midnight-fuchsia hover:bg-midnight-rose ml-2 pl-3 pr-3 h-full', type: 'button', onClick: function () { dispatch(setTypeName(currName)); } }, "Submit")));
}
//# sourceMappingURL=typeComponent.js.map