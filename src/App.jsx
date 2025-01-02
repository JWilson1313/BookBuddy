import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainContainer from "./components/Maincontainer.jsx";
import store from "./store/store.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <MainContainer />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;