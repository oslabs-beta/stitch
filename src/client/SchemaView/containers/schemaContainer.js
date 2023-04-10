// container for each generated schema
import TypeComponent from "../components/typeComponent";
import SchemaFieldComponent from "../components/fieldComponent";
import AddCustomSchemaFieldComponent from "../components/addCustomFieldComponent";
import { useSelector } from "react-redux";

export default function SchemaContainer() {
  const schemas = useSelector((state) => state.schemaSlice.schemaFields);
  const typeName = useSelector((state) => state.schemaSlice.typeName);
  let displayTypeName = "";

  if (typeName.name != "") {
    displayTypeName = typeName;
  }

  const arrayOfSchemaFieldComponents = [];
  for (const key in schemas) {
    arrayOfSchemaFieldComponents.push(
      <SchemaFieldComponent
        key={`field-component-${key}`}
        className="jsonFieldComponent"
        objectKey={key}
        objectValue={schemas[key]}
      />
    );
  }

  // SCHEMA VIEW
  return (
    <div className="schemaContainer">
      <TypeComponent />
      <br />
      <>{`type ${displayTypeName} {`}</>
      {arrayOfSchemaFieldComponents}
      {/* <AddCustomSchemaFieldComponent></AddCustomSchemaFieldComponent> */}
      <>{"}"}</>
    </div>
  );
}
