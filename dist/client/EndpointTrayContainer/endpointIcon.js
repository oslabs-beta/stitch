// icon (clickable) representing json response from endpointComponent
import { useDispatch } from 'react-redux';
import { updateActiveEndpoint } from '../store/slices/dataSlice';
function EndpointIcon(_a) {
    var endpointURL = _a.endpointURL;
    var dispatch = useDispatch();
    return (React.createElement("div", { className: 'basis-2/3' },
        React.createElement("button", { className: 'bg-desert-gray hover:bg-space-jet pl-4 pr-4 h-10 w-40 rounded-md ml-5 mb-5 first:mt-5 overflow-hidden text-ellipsis text-left', onClick: function () { return dispatch(updateActiveEndpoint(endpointURL)); } }, endpointURL)));
}
export default EndpointIcon;
//# sourceMappingURL=endpointIcon.js.map