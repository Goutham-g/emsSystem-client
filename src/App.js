
import './App.css';
import Home from './components/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Edit from './components/Edit';
import View from './components/View';
import Pnf from './components/Pnf';




function App() {
  return (
    <div className="App">
      <Header></Header>


      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='add' element={<Add></Add>}></Route>
        <Route path='edit/:id' element={<Edit></Edit>}></Route>
        <Route path='view/:id' element={<View></View>}></Route>
        <Route path='*' element={<Pnf></Pnf>}></Route>


      </Routes>
      <Footer></Footer>


    </div >
  );
}

export default App;
