import { ToastContainer } from "react-toastify";
import Router from "./routes/router";
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}
export default App;
