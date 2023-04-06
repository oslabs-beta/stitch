// renders single line of json response with check box and buttons to add to schema
import { useDispatch } from "react-redux";
import { addSchemaField } from "../store/slices/schemaSlice";

export default function JsonFieldComponent({ objectKey, objectValue }) {
  const dispatch = useDispatch();
  
  return (
    <>
      <p>
      {/* "{objectKey}" : {typeof objectValue === 'object' ? 'object' : objectValue}<button>add</button> */}
      {/* "{objectKey}" : {typeof objectValue}<button>add</button> */}
      "{objectKey}" : {JSON.stringify(objectValue)}
      <button onClick={() => dispatch(addSchemaField({objectKey, objectValue}))}>
        add
      </button>
      </p>
    </>
  );
}