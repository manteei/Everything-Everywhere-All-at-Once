import Router from "./service/router/Router";
import { Provider } from 'react-redux'
import store from "./service/redux/store";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
        <Router/>
        <Toaster position="bottom-center"/>
    </Provider>
  );
}

export default App;
