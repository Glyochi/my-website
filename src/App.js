import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import NavBar from "./components/NavBar/NavBar"
import HomePageBody from './components/Pages/Home/HomePageBody';
import ResumePageBody from './components/Pages/Resume/ResumePageBody';

import StreamPageBody from './components/Pages/Stream/StreamPageBody';
// import FacialDetection from './components/Pages/Stream/WebSocket';
// import ParticlesBackground from './AnimatedBackground/ParticlesBackground';
// import Wallpaper from "./Assets/wallpaper.jpg"
// import TetrisPageBody from './components/Pages/Tetris/TetrisPageBody';


function App() {

  return (
    // <div className=' overflow-hidden w-[1910px] h-[1070px]'>
      <div className='Page '
      style={{
       overflow: 'hidden',
      }}>

        <Router>
          <div className='mt-8 z-30'>
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<HomePageBody />} />
            <Route path="/my-website/" element={<HomePageBody />} />
            <Route path="/Home" element={<HomePageBody />} />
            <Route path="/Resume" element={<ResumePageBody />} />
            <Route path="/View Online" element={<HomePageBody />} />
            <Route path="/ImprovedFacialDetection" element={<StreamPageBody />} />
            {/* Static web pages dont need endpoint */}
            {/* <Route path="/Tetris"  onEnter={reloadTetris}/> */}
            {/* <Route path="/Graph"  onEnter={reloadGraph}/> */}
            
          </Routes>
        </Router>
      </div>
    // </div>



  );
}

export default App;
