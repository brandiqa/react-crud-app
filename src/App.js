import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            React Crud Demo
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link class="navbar-item" to="/">Home</Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="ui two item menu">
            <NavLink className="item" activeClassName="active" exact to="/">
              Contacts List
            </NavLink>
            <NavLink className="item" activeClassName="active" exact to="/contacts/new">
              Add Contact
            </NavLink>
          </div>
          <Route exact path="/" component={ContactListPage}/>
          <Route path="/contacts/new" component={ContactFormPage}/>
          <Route path="/contacts/edit/:_id" component={ContactFormPage}/>
        </div>
      </div>
    );
  }
}
export default App;
