import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import './App.css'
import Paper from '@mui/material/Paper'

function App() {
  const [collections, setCollections] = useState(null)
  const [token, setToken] = useState('')
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    collection: '',
    artist: '',
  })

  const useStyles = makeStyles({
    root: {
      height: '100%',
      background: 'grey',
    },
    mainContainer: { width: '1000px' },
    container1: {
      width: '100%',
      padding: '20px',
    },
    container2: {
      width: '100%',
      padding: '20px',
    },
    textField: {
      width: '40%',
      margin: '10px',
      width: '300px',
      marginRight: '50px',
    },
    button: { margin: '20px' },
    select: { margin: '10px' },
  })
  const classes = useStyles()

  useEffect(() => {
    fetchToken().then((token) => {
      fetchData(token)
      setToken(token)
    })
  }, [])

  async function fetchToken() {
    try {
      const res = await fetch('http://localhost:5000/token')
      const data = await res.json()
      return data.token
    } catch (err) {
      console.log(err)
    }
  }

  async function postDetails(token, inputs) {
    console.log('inputs', inputs)
    await fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
  }

  async function fetchData(token) {
    try {
      const res = await fetch('http://localhost:5000/options', {
        headers: {
          authorization: token,
        },
      })
      const data = await res.json()
      setCollections(data.collections)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid
      className={classes.root}
      container
      justifyContent="center"
      alignItems="center">
      <Paper className={classes.mainContainer}>
        <Grid className={classes.container1}>
          <Grid container justifyContent="center" alignItems="center">
            <label>
              Name of NFT
              <input
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                type="text"
                className={classes.textField}
                placeholder="Enter the Name"
              />
            </label>
            <label className={classes.label}>
              Collection
              <select
                className={classes.select}
                onChange={(e) =>
                  setInputs({ ...inputs, collection: e.target.value })
                }>
                {collections &&
                  collections.map((option) => (
                    <option key={option} value={option.label}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </label>
          </Grid>
        </Grid>
        <Grid className={classes.container2}>
          <Grid container justifyContent="center">
            <label>
              NFT Description
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                type="text"
                className={classes.textField}
                placeholder="Enter Description"
              />
            </label>
            <label>
              Artist
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, artist: e.target.value })
                }
                type="text"
                className={classes.textField}
                placeholder="Enter Artist Name"
              />
            </label>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <button
            className={classes.button}
            onClick={() => {
              postDetails(token, inputs)
            }}>
            Create
          </button>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default App
