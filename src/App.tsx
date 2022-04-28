import './assets/css/App.css';
import AppWrapper from './components/appWrapper';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Tomorrow from './routes/tomorrowPage';
import Today from './routes/todayPage';
import SevenDays from './routes/sevenDaysPage';
import PageNotFound from './routes/pageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />} >
          <Route path="/" element={<Today />} />
          <Route path="tomorrow" element={<Tomorrow />} />
          <Route path="sevendays" element={<SevenDays />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

