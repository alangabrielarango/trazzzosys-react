import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavigationMenu from './components/NavigationMenu';
import { Contact } from './components/Contact';
import Login from './components/Login';
import { User } from './components/User';
import { Home } from './components/Home';
import { Company } from './components/Company';
import { Account } from './components/Account';
import { Category } from './components/Category';
import { Subcategory } from './components/Subcategory';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationMenu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contactos" element={<Contact />} />
          <Route path="/empresas" element={<Company />} />
          <Route path="/cuentas" element={<Account />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/subcategorias" element={<Subcategory />} />
          <Route path="/usuarios" element={<User />} />
          {/* Add more routes for other components here */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
