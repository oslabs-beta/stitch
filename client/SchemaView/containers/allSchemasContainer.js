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

  function handleCopy() {
    console.log('test');
    navigator.clipboard
      .writeText(schemaString)
      .then(() => console.log('copy successful'))
      .catch((e) => console.log({ error: e, message: 'copy failed' }));
  }
  return (
    <div className='allSchemasContainer'>
      <h1>Schema View</h1>
      <SchemaContainer />
      <button onClick={handleCopy}>Copy Schema</button>
    </div>
  );
}
