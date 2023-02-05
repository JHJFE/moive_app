import logo from './logo.svg';
import './App.css';
import React from 'react'
import PropTpyes from 'prop-types'
import axios from 'axios';
import Movie from './movie';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }
  getMoives = async() => {
    const {
      data:{
        data:{movies}
      }
    }= await axios.get('https://yts-proxy.now.sh/list_movies.json')
    this.setState({movies, isLoading: false});
  }
  componentDidMount() {
    this.getMoives();
  }



  render() {
    const { isLoading, movies} = this.state;
    function MovieList(){
      return movies.map(movie=>{
        return <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster = {movie.medium_cover_image}/>
      })
    }
    return( <section className='container'>
      {isLoading ? <div className="loader">
        <span className="loader__textcontent">Loading...!</span>
      </div> : <div className="movies">
        <MovieList/>
      </div>
      }
      
    </section>)
  }
}

export default App;
