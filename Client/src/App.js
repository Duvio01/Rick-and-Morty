import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import backgroundLogin from './components/Images/backgroundLogin.jpg'
import backgroundHome from './components/Images/backgroundHome.jpg'
import Favorites from './components/Favorites/Favorites';
import { useDispatch, useSelector } from 'react-redux';
import { removeFav } from './redux/actions';
import Page404 from './components/Page404/Page404';

function App() {

   const dispatch = useDispatch()
   const stateGlobal = useSelector((state) => state)
   const [characters, setCharacters] = useState([])
   const [loading, setLoading] = useState(false)
   const location = useLocation()
   const navigate = useNavigate()
   const [access, setAccess] = useState(false)
   const idUrl = window.location.href.split('/')[4]

   let imagenFont = access ? backgroundHome : backgroundLogin

   let imagenHeight
   // let imagenHeight = characters.length > 5 && (location.pathname === '/home' || location.pathname === '/favorites') ? '' : '100vh'

   if (location.pathname === '/home') {
      if (characters.length > 5) {
         imagenHeight = ''
      } else {
         imagenHeight = '100vh'
      }
   } else if (location.pathname === '/favorites') {
      if (stateGlobal.myFavorites.length > 5) {
         imagenHeight = ''
      } else {
         imagenHeight = '100vh'
      }
   } else {
      imagenHeight = '100vh'
   }

   const styleLogin = {
      backgroundImage: `url(${imagenFont})`,
      height: imagenHeight,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
   }

   const login = async(userData) => {

      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const response = await axios(URL + `?email=${email}&password=${password}`)
         setAccess(response.data);
         
      } catch (error) {
         alert('Datos invalidos')
      }
   }

   const logout = () => {
      setAccess(false)
   }


   useEffect(() => {
      if(access){
         access && navigate('/home');
      }else{
         if (location.pathname !== '/home' && location.pathname !== '/about' && location.pathname !== '/favorites' && location.pathname !== `/detail/${idUrl}` && location.pathname !== '/') {
            setAccess(false)
         } else {
            !access && navigate('/')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [access])

   const onSearch = async (id) => {
      try {
         if (id !== '') {
            const findCharacter = characters.find((character) => character.id === Number(id))
            if (findCharacter) {
               alert('El character ya fui agregado')
            } else {
               setLoading(true)
               const response = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
                  setCharacters([...characters, response.data])
                  setLoading(false)
                  // setCharacters((oldChars) => [...oldChars, data]);
            }
         } else {
            alert('Debe indicar un id')
         }
      } catch (error) {
         alert('¡No hay personajes con este ID!')
         setLoading(false)
      }
   }

   const onClose = (id) => {
      const filterCharacter = characters.filter(character => character.id !== id)
      setCharacters(filterCharacter)
      dispatch(removeFav(id))
   }

   return (
      <div style={styleLogin}>
         {
            location.pathname !== '/' && (location.pathname === '/home' || location.pathname === '/about' || location.pathname === '/favorites' || location.pathname === `/detail/${idUrl}`) ? (
               <Nav search={onSearch} logout={logout} />
            ) : null
         }
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path='/home' element={<Cards onClose={onClose} characters={characters} loading={loading} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path="*" element={<Page404 />}></Route>
            <Route path='/favorites' element={<Favorites />} />
         </Routes>


      </div>
   );
}

export default App;
