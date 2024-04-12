import { useEffect, useState } from 'react'
import './App.css'

// Note: this import works only after generating the frontend code through the Platformatic CLI
import { getMovies, createMovie, updateMovie, setBaseUrl } from './platformatic-generated-code/api/api'

setBaseUrl('http://localhost:9999')

function App() {
  const [movies, setMovies] = useState<Awaited<ReturnType<typeof getMovies>>>([])
  const [newMovie, setNewMovie] = useState<Awaited<ReturnType<typeof createMovie>>>()

  async function onCreateMovie() {
    const newMovie = await createMovie({ title: 'Harry Potter' })
    setNewMovie(newMovie)
  }

  async function onUpdateMovie() {
    if (!newMovie || !newMovie.id) return

    const updatedMovie = await updateMovie({ id: newMovie.id, title: 'The Lord of the Rings' })
    setNewMovie(updatedMovie)
  }

  useEffect(() => {
    async function fetchMovies() {
      const movies = await getMovies({})
      setMovies(movies)
    }

    fetchMovies()
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <h2>Testing out the frontend code automatically generated by the Platformatic CLI.</h2>
      <p>
        You can find more details about the topic at:&nbsp;
        <a
          href="https://docs.platformatic.dev/docs/reference/cli/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          https://docs.platformatic.dev/docs/reference/cli/
        </a>
      </p>

      <h2>Movies</h2>
      {movies.length === 0 ? (
        'No movies yet'
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}

      <button onClick={onCreateMovie}>Create movie</button>
      <button onClick={onUpdateMovie}>Update movie</button>

      {newMovie && <div>Title: {newMovie.title}</div>}
    </>
  )
}

export default App
