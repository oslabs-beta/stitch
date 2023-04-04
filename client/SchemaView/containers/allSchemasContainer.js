// container for all individual generated schemas
import SchemaContainer from "./schemaContainer";

export default function AllSchemasContainer () {
//   const schemas = []; 
  return (
    <div className='allSchemasContainer'>
      <h1>Schema View</h1>
        <SchemaContainer/>
    </div>
  )
}
