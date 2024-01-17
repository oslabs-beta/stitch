// container for json response components and all associated functionality
import JsonFieldComponent from './jsonFieldComponent';
import { useSelector } from 'react-redux';
export default function JSONFieldContainer() {
    var jsonObject = useSelector(function (state) { return state.responseData.activeEndpoint.responseBody; });
    var url = useSelector(function (state) { return state.responseData.activeEndpoint.url; });
    var arrayOfComponents = [];
    for (var key in jsonObject) {
        arrayOfComponents.push(React.createElement(JsonFieldComponent, { key: "field-component-".concat(key), className: 'jsonFieldComponent', objectKey: key, objectValue: jsonObject[key] }));
    }
    return (React.createElement("div", { className: 'bg-colorHunt-secondary border-r-2 border-r-colorHunt-primary basis-2/5 flex flex-col col-span-2 min-w-0' },
        React.createElement("h1", { className: 'text-center text-3xl pb-4 pt-5' }, "JSON Response"),
        React.createElement("h3", { className: 'pb-4 pl-4 italic text-vscode-comment' }, url),
        React.createElement("p", { className: 'text-vscode-yellow pl-2' }, jsonObject.url ? '{' : ''),
        arrayOfComponents,
        React.createElement("p", { className: 'text-vscode-yellow pl-2' }, jsonObject.url ? '}' : '')));
}
//# sourceMappingURL=jsonFieldContainer.js.map