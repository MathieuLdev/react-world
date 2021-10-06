import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const News = () => {
   const [newsData, setNewsData] = useState([]);
   const [author, setAuthor] = useState('');
   const [content, setContent] = useState('');
   const [error, setError] = useState(false);

   useEffect(() => {
      getData();
   }, []);

   const getData = () => {
      axios
         .get('http://localhost:3003/articles')
         .then((res) => setNewsData(res.data));
   };
   
   const handleSubmit = (e) => {
      e.preventDefault();
      
      if (content.length < 80) {
         setError(true);
      } else {
         axios
         .post("http://localhost:3003/articles", {
            author: author,
            content: content,
            date: Date.now()
         }).then(() => {
            setError(false);
            setAuthor("");
            setContent("");
            getData();
         });
      };
   };

   return (
      <div className="news-container">
         <Navigation />
         <Logo />
         <h1>News</h1>

         <form onSubmit={handleSubmit}>
            <input 
               onChange={(e) => setAuthor(e.target.value)} 
               type="text" 
               placeholder="Nom" 
               value={author}
            />
            <textarea 
               style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} 
               onChange={(e) => setContent(e.target.value)} 
               placeholder="Message" 
               value={content}>
            </textarea>
            {error && <p>Veuillez écrire un minimum de 80 caractères</p>}
            <input type="submit" value="Envoyer" />
         </form>

         <ul>{newsData
               .sort((a, b) => (b.date - a.date))
               .map((article) => (
            <Article key={article.id} article={article}/>
         ))}</ul>
      </div>
   );
};

export default News;