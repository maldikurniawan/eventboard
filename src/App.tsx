import { Layout, NotFound } from "@/components";
import { AttendanceListPage, EventAttendanceList, FormAttendance, LoginPage, QRCode } from "@/pages";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { menu } from "./constants/menu";
import PrivateRoute from "./pages/auth/PrivateRoute";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {menu.map((item, index) => {
              if (item.sub && item.sub.length > 0) {
                return item.sub?.map((sub, index) => {
                  return <Route key={index} path={sub.path} element={sub.element} />;
                });
              } else {
                return <Route key={index} path={item.path} element={item.element} />;
              }
            })}
            <Route path="/attendance/list" element={<AttendanceListPage />} />
          </Route>
          <Route path="/qrcode" element={<QRCode />} />
          <Route path="/form" element={<FormAttendance />} />
          <Route path="/result" element={<EventAttendanceList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App