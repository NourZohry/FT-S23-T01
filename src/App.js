import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';
import { Stats } from './features/stats/Stats';
import { Movies } from './features/movies/Movies';
import { useSelector } from 'react-redux';
import { getAllMovies } from './features/movies/moviesSlice';

function App() {
  return (
    <div>
      <Container>
      <Typography component="h1" sx={{fontSize: "32px", fontWeight: "bold", marginTop: "10px"}}>Movies</Typography>
      {useSelector(getAllMovies) && <Stats/>} 
      <Movies/>
      </Container>
    </div>
  );
}

export default App;
