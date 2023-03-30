// container for each generated schema
import TypeComponent from '../components/typeComponent';
import FieldComponent from '../components/fieldComponent';
import AddCustomFieldComponent from '../components/addCustomFieldComponent';

export default function SchemaContainer () {
  return (
    <div className="schemaContainer">
      <TypeComponent></TypeComponent>
      <FieldComponent></FieldComponent>
      <AddCustomFieldComponent></AddCustomFieldComponent>
    </div>
  )
}