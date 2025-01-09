import { useState , useRef, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import JoditEditor from 'jodit-pro-react'
import { api_base_url } from '../Helper';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const CreateDocs = () => {
    let {docsId} = useParams()
    const editor = useRef(null)
    const [content, setContent] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate("")


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
          Swal.fire({
            title: 'Error!',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33', 

          })
        }
        else{
          Swal.fire({
            title: 'Success!',
            text: 'Document saved successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff',
          }).then(() => {
            navigate('/');
          });
          navigate("/")
          
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
          setContent(data.doc.content || '' )
        }
      })
    )}
    useEffect(() =>{
      getContent();
    }, [])


  return (
    <>
    <Navbar />
    <div className='px-[80px] mt-2'>
    <JoditEditor ref={editor} value={content} config={{placeholder: 'Start typing...', }} tabIndex={1} onBlur={e=> {
      setContent(e)
    }} />
     <div className="mt-3 justify-center" style={{ display: 'flex' }}>
          <button
            onClick={updateDoc}
            className="bg-blue-500 text-white px-4 py-2 w-[20%] rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
    </div>
    </>
  )
}

export default CreateDocs