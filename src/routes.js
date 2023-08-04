import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved, import/extensions
import Main from './pages/Main';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Repository from './pages/Repository';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repository/:repo" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
