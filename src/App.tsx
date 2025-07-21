import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventAttendanceList from "./pages/EventAttendanceList";
import FormAttendance from "./pages/FormAttendance";
import QRCode from "./pages/QRCode";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRCode />} />
          <Route path="/form" element={<FormAttendance />} />
          <Route path="/event" element={<EventAttendanceList />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App