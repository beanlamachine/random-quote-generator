import { useState } from "react";

import "./App.css";

function App() {
  const [quoteType, setQuoteType] = useState("life");
  const [currentQuote, setCurrentQuote] = useState(null);

  const handleInputChange = (e) => {
    const quoteType = e.target.value;
    setQuoteType(quoteType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected quote type:", quoteType);

    const category = quoteType;

    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "rEIR5ZgmOQESNypgiC0sWQ==j35si9gTonnS5Nfg",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCurrentQuote(data[0]);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  function Quote() {
    const authorSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      currentQuote.author
    )}`;

    return (
      <div>
        <br></br>
        <h3>Quote: </h3>
        <p className="redbold">"{currentQuote.quote}"</p>
        <footer>
          -{" "}
          <a href={authorSearchUrl} target="_blank" rel="noopener noreferrer">
            {currentQuote.author}
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <h1> Welcome to Random Quote Generator</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Select the type of quote you would like to have:
          <br />
          <br />
          <select value={quoteType} onChange={handleInputChange}>
            <option value="life">life</option>
            <option value="communication">communication</option>
            <option value="death">death</option>
            <option value="business">business</option>
            <option value="dating">dating</option>
            <option value="equality">equality</option>
            <option value="failure">failure</option>
            <option value="friendship">friendship</option>
            <option value="happiness">happiness</option>
            <option value="health">health</option>
            <option value="humor">humor</option>
            <option value="leadership">leadership</option>
            <option value="learning">learning</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        {currentQuote ? (
          <Quote />
        ) : (
          <p>
            <br />
            Select Category
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
