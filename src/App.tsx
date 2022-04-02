// import React from 'react';
import logo from './logo.svg';

import './App.css';
import AppWrapper from './components/appWrapper';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Forecast from './routes/forecastPage';
import Current from './routes/currentPage';
import PageNotFound from './routes/pageNotFound';
// import { selectData } from './actions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />} >
          <Route path="/" element={<Current />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;


// =================================================================

// import React, { Component } from "react";

// // Importing geolocated reducer function
// import { GeolocatedProps, geolocated } from "react-geolocated";

// class App extends Component<GeolocatedProps> {

//   constructor(props: any) {
//     super(props);


//   }


//   // getCoords(props: any) {
//   //   props.isGeolocationAvailable ? (
//   //     props.isGeolocationEnabled ? (
//   //       props.coords ? (
//   //         // save coords
//   //         <div>
//   //           <h1 style={{ color: "green" }}>GeeksForGeeks</h1>
//   //           <h3 style={{ color: "red" }}>
//   //             Current latitude and longitude of the user is
//   //           </h3>
//   //           <ul>
//   //             <li>latitude - {this.props.coords.latitude}</li>
//   //             <li>longitude - {this.props.coords.longitude}</li>
//   //           </ul>
//   //         </div>
//   //       ) : (
//   //         // <h1>Getting the location data</h1>
//   //         <></>
//   //       )
//   //     ) : (
//   //       // <h1>Please enable location on your browser</h1>
//   //       <></>
//   //     )
//   //   ) : (
//   //     <h1>Please, update your or change the browser </h1>
//   //   );
//   // }





//   render() {

//     return this.props.isGeolocationAvailable ? (
//       this.props.isGeolocationEnabled ? (
//         this.props.coords ? (
//           <div>
//             <h1 style={{ color: "green" }}>GeeksForGeeks</h1>
//             <h3 style={{ color: "red" }}>
//               Current latitude and longitude of the user is
//             </h3>
//             <ul>
//               <li>latitude - {this.props.coords.latitude}</li>
//               <li>longitude - {this.props.coords.longitude}</li>
//             </ul>
//           </div>
//         ) : (
//           <h1>Getting the location data</h1>
//         )
//       ) : (
//         <h1>Please enable location on your browser</h1>
//       )
//     ) : (
//       <h1>Please, update your or change the browser </h1>
//     );
//   }

// }

// // Binding geolocated() reducer function to
// // App component, while exporting it
// export default geolocated()(App);
