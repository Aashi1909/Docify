import React, { useState , useRef} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import JoditEditor from 'jodit-pro-react'

const CreateDocs = () => {
    let {docsId} = useParams()
    const editor = useRef(null)
    const [content, setContent] = useState("")
  return (
    <>
    <Navbar />
    <div className='px-[100px] mt-4'>
    <JoditEditor ref={editor} value={content} tabIndex={1} onChange={newContent => setContent(newContent)} />
    </div>
    </>
  )
}

export default CreateDocs