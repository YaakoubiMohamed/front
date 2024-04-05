// Home.js
import React, { useState, useEffect } from 'react';
import Article from '../Article/Article';
import './Home.css';
import axios from "axios";

function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  // Simulez une requête API pour obtenir les articles
  useEffect(() => {
    const fetchArticles = async () => {
      const data = await axios.get('http://localhost:5000/api/articles');
      console.log(data)
      setArticles(data.data);
    };
    fetchArticles();
  }, []);

  const filteredArticles = Array.isArray(articles) ? articles.filter(article =>
    article.titre.toLowerCase().includes(search.toLowerCase())
  ): [];

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredArticles.map(article => (
        <>
        {article._id &&<Article key={article._id} article={article} />}
        </>
      ))}
    </div>
  );
}

export default Home;
