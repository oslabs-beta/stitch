import EndpointComponent from './EndpointComponent/endpointComponent';
import IconTrayContainer from './EndpointTrayContainer/iconTrayContainer';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';
import AllSchemasContainer from './SchemaView/containers/allSchemasContainer';
export default function App() {
    return (
    //anything in className is tailwind styling
    React.createElement("div", { className: '' },
        React.createElement("div", { className: 'bg-colorHunt-secondary flex flex-row h-28 border-b-2 border-b-colorHunt-primary' },
            React.createElement(EndpointComponent, null)),
        React.createElement("div", { className: 'flex flex-row h-screen max-h-fit' },
            React.createElement(IconTrayContainer, null),
            React.createElement(JSONFieldContainer, null),
            React.createElement(AllSchemasContainer, null))));
}
//# sourceMappingURL=App.js.map