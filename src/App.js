import Dashboard from './Components/Dashboard'
import DetailView from './Components/DetailView'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import React, {useState} from 'react'
import grabArticles from './apiCalls'

function App() {
  const [detailArticle, setDetailArticle] = useState({})

  const handleArticleChoice = (e, category) => {
    setDetailArticle({})
    grabArticles(category).then(data => {setDetailArticle(data.results.find((result) => {
      if(result.title === e.target.id) {
        console.log(result, 'result')
        return result
      }
    }))
  })
  }

  return (
    <div className='wrapper'>
    <h1 className='main-title'>Top News of Today</h1>
    <Switch>
      <Route exact path='/'>
        <Dashboard handleChoice={handleArticleChoice}/>
      </Route>
      <Route path={`/details/${detailArticle.title}`}>
        <DetailView articleInfo={detailArticle}/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
