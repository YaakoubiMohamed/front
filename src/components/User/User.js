// User.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../Article/Article';
import './User.css';

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  // Simulez une requête API pour obtenir les détails de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      const data = {
        // Remplacez ceci par votre propre logique de requête API
      };
      setUser(data);
    };
    fetchUser();
  }, [id]);

  // Simulez une requête API pour obtenir les articles de l'utilisateur
  useEffect(() => {
    const fetchArticles = async () => {
      const data = [
        // Remplacez ceci par votre propre logique de requête API
      ];
      setArticles(data);
    };
    fetchArticles();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user">
      <h2>{user.nom} {user.prenom}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Date de création:</strong> {new Date(user.dateCreation).toLocaleDateString()}</p>
      <h3>Articles:</h3>
      {articles.map(article => (
        <Article key={article._id} article={article} />
      ))}
    </div>
  );
}

export default User;
