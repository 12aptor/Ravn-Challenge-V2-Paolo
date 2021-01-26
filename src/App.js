import './App.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import Home from './Components/Home';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index'
  })
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </>
  );
}

export default App;
