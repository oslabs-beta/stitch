// container for all individual generated schemas
import SchemaContainer from './schemaContainer';
import { useSelector } from 'react-redux';

export default function AllSchemasContainer() {
  const schema = useSelector((state) => state.schemaSlice.schemaFields);
  let schemaString = '';
  for (const key in schema) {
    schemaString += key + ' : ' + schema[key].value + ', ';
  }
  console.log(schemaString);
  return (
    <div className='allSchemasContainer'>
      <h1>Schema View</h1>
      <SchemaContainer />
      <button>Copy Schema</button>
    </div>
  );
}
