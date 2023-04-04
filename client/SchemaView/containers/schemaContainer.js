// container for each generated schema
import TypeComponent from '../components/typeComponent';
import SchemaFieldComponent from '../components/fieldComponent';
import AddCustomSchemaFieldComponent from '../components/addCustomFieldComponent';
import { useSelector } from 'react-redux';

export default function SchemaContainer () {

  const schemas = useSelector((state) => state.schemaSlice.schemaFields);

  const arrayOfSchemaFieldComponents = [];
  for (const key in schemas) {
    console.log({schemas})
    arrayOfSchemaFieldComponents.push(
      <SchemaFieldComponent
        key={`field-component-${key}`}
        className='jsonFieldComponent'
        objectKey={key}
        objectValue={schemas[key]}
      />
    );
  }
  return (
    <div className="schemaContainer">
      <TypeComponent></TypeComponent>
      {arrayOfSchemaFieldComponents}
      <AddCustomSchemaFieldComponent></AddCustomSchemaFieldComponent>
    </div>
  )
}