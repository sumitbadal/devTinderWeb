import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utills/appAtore";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter base="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>  
      </Provider>   
    </>
  )
}

export default App
