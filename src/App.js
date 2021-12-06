import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import './App.css'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const [collections, setCollections] = useState(null)
  const [inputs, setInputs] = useState({ username: '', password: '' })

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
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch('http://localhost:5000/options')
      const data = await res.json()
      setCollections(data.collections)
    } catch (err) {
      console.log(err)
    }
  }

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    return <button onClick={loginWithRedirect}>LOG IN</button>
  }

  const logoutButton = () => {
    // return <button onClick={}></button>
  }

  return (
    <Grid
      className={classes.root}
      container
      justifyContent="center"
      alignItems="center">
      <Paper className={classes.mainContainer}>
        {/* <LoginButton /> */}
        <Grid className={classes.container1}>
          <Grid container justifyContent="center" alignItems="center">
            <TextField
              className={classes.textField}
              label="Name of NFT"
              id="filled-size-normal"
              defaultValue="Enter Name"
              variant="filled"
            />
            <TextField
              className={classes.textField}
              label="Size"
              id="filled-size-normal"
              defaultValue="Normal"
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid className={classes.container2}>
          <Grid container justifyContent="center">
            <TextField
              className={classes.textField}
              id="NFT Description"
              label="NFT Description"
              multiline
              rows={4}
              defaultValue="Enter Description"
              variant="filled"
            />
            <TextField
              className={classes.textField}
              label="Artist"
              id="filled-size-normal"
              defaultValue="Enter Artist Name"
              variant="filled"
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default App
