import { NotFound } from "@/components";
import { EventAttendanceList, FormAttendance, QRCode } from "@/pages";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRCode />} />
          <Route path="/form" element={<FormAttendance />} />
          <Route path="/event" element={<EventAttendanceList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App