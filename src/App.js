import { useState, useEffect } from "react";
import "./App.css";

const query = `
{
  postCollection {
    items {
      sys {
        id
      }
      title
    }
  }
}
`;

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    window
      .fetch("https://graphql.contentful.com/content/v1/spaces/" + process.env.REACT_APP_CONTENTFUL_SPACEID + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.REACT_APP_CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPosts(data.postCollection.items);
      });
  }, []);

  if (!posts) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      <header className="App-header">
        <h1>Alla mina posts!</h1>
        <ul>
          {posts.map(post => {
            return <li key={post.sys.id}>{post.title}</li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;