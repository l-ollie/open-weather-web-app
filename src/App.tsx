import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppWrapper from './components/appWrapper';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import TwoDays from './routes/twoDays';
import Current from './routes/currentPage';
import PageNotFound from './routes/pageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />} >
          <Route path="/" element={<Current />} />
          <Route path="forecast" element={<TwoDays />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
