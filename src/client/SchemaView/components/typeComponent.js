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
      <span>type</span>
      <input type="text" onChange={handleChange}></input>
      <button type="button" onClick={() => {dispatch(setTypeName(currName))}}>Submit</button>
    </div>
  );
}
