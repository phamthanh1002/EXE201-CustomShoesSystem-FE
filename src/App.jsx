import { BrowserRouter, Routes, Route } from "react-router-dom";

//Customer
import CustomerLayout from "./layouts/CustomerLayout";
import HomePage from "./pages/customer/Home/HomePage";
import ShoeCustomPage from "./pages/customer/ShoeCustomization/ShoeCustomPage";
import ShoeCleaningPage from "./pages/customer/ShoeCleaning/ShoeCleaningPage";
import ShoeAccessoriesPage from "./pages/customer/ShoeAccessories/ShoeAccessoriesPage";

//Admin

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="custom" element={<ShoeCustomPage />} />
          <Route path="cleaning" element={<ShoeCleaningPage />} />
          <Route path="accessories" element={<ShoeAccessoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
