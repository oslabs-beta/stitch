// container for all individual generated schemas
import SchemaContainer from './schemaContainer';
export default function AllSchemasContainer() {
    return (React.createElement("div", { className: 'bg-colorHunt-secondary basis-2/5 flex flex-col col-span-2' },
        React.createElement("h1", { className: 'text-center text-3xl pb-10 pt-5' }, "GraphQL Schema"),
        React.createElement(SchemaContainer, null)));
}
//# sourceMappingURL=allSchemasContainer.js.map