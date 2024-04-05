// Profile.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Article from '../Article/Article';
import ArticleForm from './ArticleForm';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Simulez une requête API pour obtenir les détails de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      const data = JSON.parse(localStorage.getItem('userInfo'));
      setUser(data);
    };
    fetchUser();
  }, []);

  // Simulez une requête API pour obtenir les articles de l'utilisateur
  useEffect(() => {
    const fetchArticles = async () => {
      const data = [
        // Remplacez ceci par votre propre logique de requête API
      ];
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleAddArticle = (article) => {
    // Ajoutez l'article ici
    setShowForm(false);
  };

  const handleEditArticle = (article) => {
    // Modifiez l'article ici
    setShowForm(false);
  };

  const handleDeleteArticle = (articleId) => {
    // Supprimez l'article ici
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>{user.nom} {user.prenom}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Date de création:</strong> {new Date(user.dateCreation).toLocaleDateString()}</p>
      <h3>Articles:</h3>
      {articles.map(article => (
        <Article key={article._id} article={article} onEdit={() => { setEditingArticle(article); setShowForm(true); }} onDelete={() => handleDeleteArticle(article._id)} />
      ))}
      <Button onClick={() => setShowForm(true)}>Ajouter un article</Button>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingArticle ? 'Modifier l\'article' : 'Ajouter un article'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArticleForm article={editingArticle} onSubmit={editingArticle ? handleEditArticle : handleAddArticle} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
