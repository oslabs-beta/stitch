// renders single line of json response with check box and buttons to add to schema
import { useDispatch } from 'react-redux';
import { addSchemaField } from '../store/slices/schemaSlice';
export default function JsonFieldComponent(_a) {
    var objectKey = _a.objectKey, objectValue = _a.objectValue;
    var dispatch = useDispatch();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'pl-8 pt-1 pb-1 flex hover:bg-vscode-selection font-monospace' },
            React.createElement("div", { className: 'basis-11/12 overflow-auto ' },
                React.createElement("span", { className: 'text-vscode-foreground' }, "\""),
                React.createElement("span", { className: 'text-vscode-cyan' }, objectKey),
                React.createElement("span", { className: 'text-vscode-foreground' }, "\""),
                React.createElement("span", { className: 'pl-2 pr-2 text-vscode-foreground' }, ":"),
                React.createElement("span", { className: 'text-vscode-foreground' }, "\""),
                React.createElement("span", { className: 'text-vscode-darkOrange' }, objectValue),
                React.createElement("span", { className: 'text-vscode-foreground' }, "\"")),
            React.createElement("button", { className: 'basis-1/12 ml-5', onClick: function () { return dispatch(addSchemaField({ objectKey: objectKey, objectValue: objectValue })); } },
                React.createElement("svg", { className: 'fill-desert-ash active:fill-desert-gray hover:fill-space-lapis', xmlns: 'http://www.w3.org/2000/svg', height: '30', viewBox: '0 96 960 960', width: '30' },
                    React.createElement("path", { d: 'M480.117 776q14.216 0 23.716-9.583 9.5-9.584 9.5-23.75V609.333h133.334q14.166 0 23.75-9.617Q680 590.099 680 575.883q0-14.216-9.583-23.716-9.584-9.5-23.75-9.5H513.333V409.333q0-14.166-9.617-23.75Q494.099 376 479.883 376q-14.216 0-23.716 9.583-9.5 9.584-9.5 23.75v133.334H313.333q-14.166 0-23.75 9.617Q280 561.901 280 576.117q0 14.216 9.583 23.716 9.584 9.5 23.75 9.5h133.334v133.334q0 14.166 9.617 23.75Q465.901 776 480.117 776ZM186.666 936q-27 0-46.833-19.833T120 869.334V282.666q0-27 19.833-46.833T186.666 216h586.668q27 0 46.833 19.833T840 282.666v586.668q0 27-19.833 46.833T773.334 936H186.666Zm0-66.666h586.668V282.666H186.666v586.668Zm0 0V282.666v586.668Z' }))))));
}
//# sourceMappingURL=jsonFieldComponent.js.map