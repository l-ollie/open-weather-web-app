import './assets/css/App.css';
import AppWrapper from './components/appWrapper';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Forecast from './routes/tomorrowPage';
import Today from './routes/todayPage';
import FiveDays from './routes/fiveDaysPage';
import PageNotFound from './routes/pageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />} >
          <Route path="/" element={<Today />} />
          <Route path="tomorrow" element={<Forecast />} />
          <Route path="fivedays" element={<FiveDays />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

