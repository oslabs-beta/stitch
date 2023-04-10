// container for all individual generated schemas
import SchemaContainer from "./schemaContainer";
import { useSelector } from "react-redux";

export default function AllSchemasContainer() {
  const schema = useSelector((state) => state.schemaSlice.schemaFields);
  const typeName = useSelector((state) => state.schemaSlice.typeName);
  let schemaString = `type ${typeName} {\n`;

  for (const key in schema) {
    schemaString += "\n\t" + key + " : " + schema[key].value + ", ";
  }
  schemaString += "\n}";
  console.log(schemaString);
  //   const schemas = [];
  function handleCopy() {
    console.log("test");
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
    <div className="allSchemasContainer">
      <h1>Schema View</h1>
      <SchemaContainer />
      <button className="copyButton" onClick={handleCopy}>
        Copy Schema
      </button>
    </div>
  );
}
