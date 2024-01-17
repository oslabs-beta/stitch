// tray containing all endpoints queried
import EndpointDeleteButton from './deleteEndpointButton';
import EndpointIcon from './endpointIcon';
import { useSelector } from 'react-redux';
export default function IconTrayContainer() {
    // Pulling in global endpoint state object
    var jsonObject = useSelector(function (state) { return state.responseData.endpointData; });
    // Unpacking state object and prop drilling
    var arrayOfComponents = [];
    for (var key in jsonObject) {
        arrayOfComponents.push([
            React.createElement("div", { className: 'flex flex-row items-center gap-2' },
                React.createElement(EndpointIcon, { key: "tray-component-".concat(key, "-endpointIcon"), endpointURL: key }),
                React.createElement(EndpointDeleteButton, { key: "tray-component-".concat(key, "-endpointDeleteButton"), endpointURL: key })),
        ]);
    }
    return (React.createElement("div", { className: 'bg-colorHunt-secondary border-r-colorHunt-primary basis-1/5 flex flex-col grow-0 border-r-2 col-span-1 ' },
        React.createElement("h1", { className: 'text-center text-3xl pb-4 pt-5' }, "Endpoints"),
        arrayOfComponents));
}
//# sourceMappingURL=iconTrayContainer.js.map