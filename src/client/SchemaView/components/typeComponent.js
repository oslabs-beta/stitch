// component for changing schema type and name
import { useSelector, useDispatch } from "react-redux";
import { setTypeName } from "../../store/slices/schemaSlice";

export default function TypeComponent() {
  const typeName = useSelector((state) => state.schemaSlice.typeName);
  const dispatch = useDispatch();
  let currName = '';

  const handleChange = (e) => {
    currName = e.target.value;
  };

  return (
    <div id="typebox">
      <span>Type</span>
      <input className="ml-2" type="text" onChange={handleChange}></input>
      <button className="rounded-md bg-midnight-fuchsia border-2 hover:bg-midnight-rose ml-2 p-0.5" type="button" onClick={() => {dispatch(setTypeName(currName))}}>Submit</button>
    </div>
  );
}
