import { useDispatch } from 'react-redux';
import { deleteEndpoint } from '../store/slices/dataSlice';
function EndpointDeleteButton(_a) {
    var endpointURL = _a.endpointURL;
    var dispatch = useDispatch();
    var handleClick = function () {
        dispatch(deleteEndpoint(endpointURL));
    };
    return (React.createElement("div", { className: 'basis-1/3' },
        React.createElement("button", { className: 'bg-colorHunt-quatrinary hover:bg-colorHunt-quatrinaryDark px-2 h-10 rounded-md mr-5 mb-5 first:mt-5', onClick: handleClick },
            React.createElement("span", null, "delete"))));
}
export default EndpointDeleteButton;
//# sourceMappingURL=deleteEndpointButton.js.map