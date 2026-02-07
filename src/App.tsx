import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import NavBar from "./components/NavBar/NavBar"
import HomePageBody from './components/Pages/Home/HomePageBody';
import ResumePageBody from './components/Pages/Resume/ResumePageBody';

import StreamPageBody from './components/Pages/Stream/StreamPageBody';


const App: React.FC = () => {

  return (
      <div className='Page '
      style={{
       overflow: 'hidden',
      }}>

        <Router>
          <div className='flex flex-col items-center'>
          <div className='mt-8 z-30 '>
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<HomePageBody />} />
            <Route path="/Home" element={<HomePageBody />} />
            <Route path="/Resume" element={<ResumePageBody />} />
            <Route path="/View Online" element={<HomePageBody />} />
            <Route path="/ImprovedFacialDetection" element={<StreamPageBody />} />
            <Route path="*" element={<HomePageBody />} />
          </Routes>
          </div>
        </Router>
      </div>
    // </div>



  );
}

export default App;
