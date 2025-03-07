import React from "react";
// import {Form, Input, Button} from "@heroui/react";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";



export default function FillForm({data}) {
// const [formData, setFormData] = React.useState(aiData)
  const [fname,setfname] = React.useState(data?.structuredData?.firstName || "")
  const [lname,setlname] = React.useState(data?.structuredData?.lastname || "")
  const [age,setage] = React.useState(data?.structuredData?.age || "")
  const [qua,setqua] = React.useState(data?.structuredData?.qualification || "")
  const [form, setform] = React.useState(true)

const handleSubmit = ()=>{
  setform(false)

}
  return (
    <>
    {/* {form && <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input label="First Name" placeholder="Enter your first name" value={fname} onValueChange={setfname} />
      <Input label="Last Name" placeholder="Enter your last name" value={lname} onValueChange={setlname} />
      <Input label="Age" placeholder="Enter your age" value={age} onValueChange={setage} />
      <Input label="Qualification" placeholder="Enter your qualification" value={qua} onValueChange={setqua} />
     <Button color="default" variant="bordered" onPress={handleSubmit}>
      Submmit
     </Button>
    </div>}
    {!form && <div>Thanks for your time!</div>} */}

{form && (
  <Paper elevation={3} >
    <Box sx={{display:'flex', flexDirection:'column',padding:'1rem', margin:'1rem'}}>

    
      <TextField
        label="First Name"
        placeholder="Enter your first name"
        value={fname}
        onChange={(e) => setfname(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{margin:'1rem', maxWidth:'80%'}}
      />
      <TextField
        label="Last Name"
        placeholder="Enter your last name"
        value={lname}
        onChange={(e) => setlname(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{margin:'1rem', maxWidth:'80%'}}
      />
      <TextField
        label="Age"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setage(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{margin:'1rem', maxWidth:'80%'}}
      />
      <TextField
        label="Qualification"
        placeholder="Enter your qualification"
        value={qua}
        onChange={(e) => setqua(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{margin:'1rem', maxWidth:'80%'}}
      />
      </Box>
      <Button color="primary" variant="outlined" onClick={handleSubmit} sx={{marginLeft:'3rem', marginBottom:'3rem'
      }}>
        Submit
      </Button>
  </Paper>
)}

{!form && <div>Thanks for your time!</div>}

    
    </>


  
  );
}

