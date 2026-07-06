import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generative AI Quiz</h1>
        <input
          type="text"
          placeholder="Search for a topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </header>
      <main>
        <div className="quiz-list">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="quiz-item">
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </div>
            ))
          ) : (
            <p>No quiz items found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
