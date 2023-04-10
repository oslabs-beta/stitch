// container for all individual generated schemas
import SchemaContainer from "./schemaContainer";
import { useSelector } from "react-redux";

export default function AllSchemasContainer() {
  const schema = useSelector((state) => state.schemaSlice.schemaFields);
  const typeName = useSelector((state) => state.schemaSlice.typeName);
  let schemaString = `type ${typeName} {`;
  for (const key in schema) {
    schemaString += "\n\t" + key + " : " + schema[key].value + ", ";
  }
  schemaString += "\n}";

  function handleCopy() {
    // console.log('test');
    navigator.clipboard
      .writeText(schemaString)
      .then(() => {
        console.log("copy successful");
        const schemasContainer = document.querySelector(".allSchemasContainer");
        const newParagraph = document.createElement("p");
        newParagraph.textContent = "copied to clipboard";
        schemasContainer.appendChild(newParagraph);
      })
      .catch((e) => console.log({ error: e, message: "copy failed" }));
  }
  return (
    <div className="bg-colorHunt-secondary basis-2/5 flex flex-col col-span-2">
      <h1 className="text-3xl font-bold text-center text-purple-600 py-8 underline">Schema View</h1>
      <SchemaContainer />
      <button className="copyButton" onClick={handleCopy}>
        Copy Schema
      </button>
    </div>
  );
}
