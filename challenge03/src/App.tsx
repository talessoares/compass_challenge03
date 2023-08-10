import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Certifique-se de importar 'Routes' corretamente
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Adicione mais rotas aqui, se necessário */}
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import LoginPage from "./pages/LoginPage";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <LoginPage />
//     </div>
//   );
// }

// export default App;