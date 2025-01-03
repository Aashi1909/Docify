import React, { useState , useRef, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import JoditEditor from 'jodit-pro-react'

const CreateDocs = () => {
    let {docsId} = useParams()
    const editor = useRef(null)
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const[data, setData] = useState("")

const updateDoc =() =>{
      fetch(api_base_url + "/uploadDoc", {
        mode:"cors",
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          docId: docsId,
          content: content
        })
      }).then(res => (res.json()).then((data) =>{
        if(data.success === false)
        {
          setError(data.message)
        }
        else{
          setError("")
        }

      })
    )}

const getContent = () =>{
  fetch(api_base_url + "/getDoc", {
    mode:"cors",
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          docId: docsId,
        })
      })
      .then(res => (res.json())
      .then((data) =>{
        if(data.success === false)
        {
          setError(data.message)
        }
        else{
          setContent(data.doc.content)
        }
      })
    )}
    useEffect(() =>{
      getContent();
    }, [])


  return (
    <>
    <Navbar />
    <div className='px-[100px] mt-4'>
    <JoditEditor ref={editor} value={content} tabIndex={1} onChange={e=> {
      setContent(e)
      updateDoc();
    }} />
    </div>
    </>
  )
}

export default CreateDocs