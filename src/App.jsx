import "./App.css";
import axios from 'axios';
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      searchBooks();
    } 
  }, [query]);

  async function searchBooks(){
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10`);
      setBooks(response.data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input 
        type="text" 
        placeholder="Search books" 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <ul>
        {
          books.slice(0, 5).map((book,index) => ( 
            <li key={index}>{book.title}</li> 
          ))
        }
      </ul>
    </div>
  );
}

export default App;





