// Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import { AuthContext } from '../Auth/AuthContext';

function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile">Profil</Link></li>
              {/* Ajoutez d'autres liens pour les utilisateurs connectés ici */}
            </>
          ) : (
            <>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">Inscription</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
