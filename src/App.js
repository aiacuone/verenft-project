import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import './App.css'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

function App() {
  const [collections, setCollections] = useState(null)
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
    textField: { width: '40%' },
  })
  const classes = useStyles()

  useEffect(() => {
    fetchToken().then((token) => {
      fetchData(token)
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
            <TextField
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              className={classes.textField}
              label="Name of NFT"
              id="filled-size-normal"
              defaultValue="Enter Name"
              variant="filled"
            />
            <TextField
              onChange={(e) =>
                setInputs({ ...inputs, collection: e.target.value.label })
              }
              value={inputs.collection}
              className={classes.textField}
              id="outlined-select-currency"
              select
              label="Collection"
              variant="filled">
              {collections &&
                collections.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid className={classes.container2}>
          <Grid container justifyContent="center">
            <TextField
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
              className={classes.textField}
              id="NFT Description"
              label="NFT Description"
              multiline
              rows={4}
              defaultValue="Enter Description"
              variant="filled"
            />
            <TextField
              onChange={(e) => setInputs({ ...inputs, artist: e.target.value })}
              className={classes.textField}
              label="Artist"
              id="filled-size-normal"
              defaultValue="Enter Artist Name"
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <button
            onClick={() => {
              // console.log(inputs)
              try {
                fetch('http://localhost:5000/create', {
                  method: 'POST',
                  body: JSON.stringify(inputs),
                  // body: inputs,
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                })
              } catch (err) {
                console.log(err)
              }
            }}>
            Create
          </button>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default App
