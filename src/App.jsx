import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
        <Route path='/' element={<Body/>}>
         <Route path='/' element={<Feed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path="*" element={<NotFound/>} />
        </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App