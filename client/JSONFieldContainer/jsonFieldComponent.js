// renders single line of json response with check box and buttons to add to schema
export default function JsonFieldComponent({ objectKey, objectValue }) {
  return (
    <p>
      "{objectKey}" : "{typeof objectValue === 'object' ? 'object' : objectValue}"<button>add</button>
      {/* "{objectKey}"<button>add</button> */}
      <button>delete</button>
    </p>
  );
}
