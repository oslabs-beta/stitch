var _a;
import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    //ON EACH CLICK, ADD URL AND JSON RESPONSE OBJ DATA AS K/V PAIRS TO ENDPOINTS OBJECT
    endpoints: {},
};
export var endpointSlice = createSlice({
    name: 'endpoints',
    initialState: initialState,
    reducers: {
        addEndpoint: function (state, url) {
            fetch('/postURL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(url),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                state.endpoints[url] = data;
            });
        }
    },
});
export var addEndpoint = (_a = endpointSlice.actions, _a.addEndpoint), deleteEndpoint = _a.deleteEndpoint;
export default endpointSlice.reducer;
//# sourceMappingURL=endpointSlice.js.map