import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import Contacts from './Pages/Contacts/Contacts';
import About from './Pages/About/About';
import Page404 from './Pages/Page404/Page404';
import Header from './Components/PageComponents/Header/Header';
import Main from './Components/PageComponents/Main/Main'
import Footer from './Components/PageComponents/Footer/Footer';
import './App.css';
import Cart from './Pages/Cart/Cart';
import Catalog from './Pages/Catalog/Catalog';
import ItemPage from './Pages/ItemPage/ItemPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Main>
          <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/catalog/:id' component={ItemPage}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/contacts' component={Contacts}/>
            <Route path='/about' component={About}/>
            <Route path='/cart' component={Cart}/>
            <Route component={Page404}/>
          </Switch>
        </Main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
