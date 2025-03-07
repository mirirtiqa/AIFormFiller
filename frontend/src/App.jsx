import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import {vapi, startAssistant, stopAssistant} from './ai'
import FillForm from './FillForm';
import CircularProgress from '@mui/material/CircularProgress';
import { Paper } from '@mui/material';



function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantEndedCall, setAssistantEndedCall] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callEnded,setCallEnded] = useState(true);
  const [fetchingData,setfetchingData] = useState(false);
  const [callResult, setCallResult] = useState(null);

  const getCallDetails = (interval = 3000) =>{
    console.log("fetching call details..")
    setfetchingData(true)
    fetch("/call-details?call_id=" + callId)
    .then((response)=> response.json())
    .then((data) =>{
      if (data.analysis) {
        setCallEnded(true)
        setCallResult(data.analysis)
        setfetchingData(false)
        console.log(data.analysis.structuredData.firstName)
      }
      else{
        setTimeout(()=> getCallDetails(interval),interval)
    }}
    ).catch((error)=>{
      alert(error)
    });
  }

  const  handleStart = async()=> {
    setLoading(true)
    setCallEnded(false)
    const data = await startAssistant()
    setCallId(data.id)
    console.log(data.id)
    }

  const handleStop = ()=>{
    stopAssistant()
    getCallDetails()

  }

useEffect(
  ()=>{
    vapi.on("call-start",()=>{
      setLoading(false);
      setStarted(true);
    }).on("call-end",()=>{
      setStarted(false);
      setLoading(false);
      // getCallDetails();
    }).on("speech-start",()=>{
      setAssistantIsSpeaking(true)
    }).on("speech-end",()=>{
      setAssistantIsSpeaking(false)
    }).on("volume-level",(level)=>{
      setVolumeLevel(level)
    })
  }
  ,[]
)


 const showForm = !loading && !started 

  return (
    <>
    <Paper elevation={0} sx={{margin: '2rem', padding:'1rem'}}>
    <Button variant="outlined" onClick={handleStart} sx={{margin:'1rem'}}>Use Assistant to help you fill the form</Button>
    {loading && <CircularProgress/>}
    {fetchingData && <CircularProgress />}
    {showForm  && callEnded && <FillForm data={callResult}/> } 
    {started && 
      <Button variant="outlined" onClick={handleStop} sx={{margin:'1rem'}} >
      End Call
      </Button>
    }
    </Paper>
    

    
    </>
  )
}

export default App
