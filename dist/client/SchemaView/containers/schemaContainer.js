// container for each generated schema
import TypeComponent from '../components/typeComponent';
import SchemaFieldComponent from '../components/fieldComponent';
import { useSelector } from 'react-redux';
import utilityFunctions from '../../../utilities/utilities';
export default function SchemaContainer() {
    var schemas = useSelector(function (state) { return state.schemaSlice.schemaFields; });
    var typeName = useSelector(function (state) { return state.schemaSlice.typeName; });
    var scalarParser = utilityFunctions.scalarParser;
    var displayTypeName = '';
    if (typeName.name != '') {
        displayTypeName = typeName;
    }
    var arrayOfSchemaFieldComponents = [];
    for (var key in schemas) {
        arrayOfSchemaFieldComponents.push(React.createElement(SchemaFieldComponent, { key: "field-component-".concat(key), className: '', objectKey: key, objectValue: schemas[key] }));
    }
    var schemaString = "type ".concat(typeName, " {");
    for (var key in schemas) {
        schemaString += '\n\t' + key + ': ' + schemas[key].value;
        if (schemas[key].requiredOption)
            schemaString += '!';
    }
    schemaString += '\n}';
    /* Function that handles copying the Query */
    function handleCopy() {
        navigator.clipboard
            .writeText(schemaString)
            .then(function () {
            console.log('copy successful');
            var schemasContainer = document.querySelector('.allSchemasContainer');
            var newParagraph = document.createElement('p');
            newParagraph.textContent = 'copied to clipboard';
            schemasContainer.appendChild(newParagraph);
        })
            .catch(function (e) { return console.log({ error: e, message: 'copy failed' }); });
    }
    // SCHEMA VIEW
    return (React.createElement(React.Fragment, null,
        React.createElement(TypeComponent, null),
        displayTypeName || arrayOfSchemaFieldComponents.length ? (React.createElement("div", { className: 'bg-space-jet relative rounded-md m-10 p-8' },
            React.createElement("button", { className: 'absolute top-0 right-0 pr-6 pt-4', onClick: handleCopy },
                React.createElement("svg", { className: 'fill-desert-ash active:fill-desert-gray hover:fill-space-lapis', xmlns: 'http://www.w3.org/2000/svg', height: '25', viewBox: '0 96 960 960', width: '25' },
                    React.createElement("path", { d: 'M341.539 827.384q-26.089 0-44.711-18.237t-18.622-44.326V270.463q0-26.089 18.622-44.326Q315.45 207.9 341.539 207.9h373.588q25.705 0 44.134 18.33 18.43 18.33 18.43 44.233v494.358q0 25.705-18.43 44.134-18.429 18.429-44.134 18.429H341.539Zm0-50.255h373.588q5.77 0 9.039-3.59 3.27-3.59 3.27-8.718V270.463q0-5.769-3.27-9.039-3.269-3.269-9.039-3.269H341.539q-5.385 0-9.231 3.269-3.847 3.27-3.847 9.039v494.358q0 5.128 3.847 8.718 3.846 3.59 9.231 3.59Zm-121.28 170.766q-25.705 0-44.135-18.429-18.429-18.429-18.429-44.134V381.796q0-10.698 7.25-17.912 7.249-7.215 17.999-7.215t17.878 7.215q7.128 7.214 7.128 17.912v503.536q0 4.616 3.846 8.462 3.847 3.847 8.463 3.847h379.073q10.699 0 17.913 7.249 7.215 7.249 7.215 17.999t-7.215 17.878q-7.214 7.128-17.913 7.128H220.259Zm108.202-689.74v518.974-518.974Z' }))),
            displayTypeName || arrayOfSchemaFieldComponents.length ? (React.createElement("span", null,
                React.createElement("span", { className: 'text-vscode-blue' }, "type"),
                React.createElement("span", { className: 'text-vscode-green pl-2' }, displayTypeName),
                React.createElement("span", { className: 'text-vscode-yellow pl-2' }, '{'))) : (''),
            arrayOfSchemaFieldComponents,
            displayTypeName || arrayOfSchemaFieldComponents.length ? (React.createElement("span", { className: 'text-vscode-yellow pl-2' }, '}')) : (''))) : (React.createElement(React.Fragment, null))));
}
//# sourceMappingURL=schemaContainer.js.map