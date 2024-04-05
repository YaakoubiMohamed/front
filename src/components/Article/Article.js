// Article.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';

function Article({ article }) {
  const { id: idFromUrl } = useParams();
  const id = article?._id || idFromUrl;
  const [art, setArt] = useState(null);

  // Simulez une requête API pour obtenir les détails de l'article
  useEffect(() => {
    console.log(id)
    const fetchArticle = async () => {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`);
      const data = await response.json();
      setArt(data);
    };
  
    fetchArticle();
  }, [id]);
  

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article">
      <h2>{art.titre}</h2>
      <p>{art.contenu}</p>
      <p><strong>Auteur:</strong> {art.auteur}</p>
      <p><strong>Date de publication:</strong> {new Date(art.datePublication).toLocaleDateString()}</p>
      <p><strong>Tags:</strong> {art.tags ? art.tags.join(', ') : 'Aucun'}</p>
      <p><strong>Catégorie:</strong> {art.categorie}</p>
      <p><strong>Statut:</strong> {art.statut}</p>
      {art.image && <img src={art.image} alt={art.titre} />}
    </div>
  );
}

export default Article;
