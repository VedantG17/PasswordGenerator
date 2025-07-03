import { useState, useCallback,useEffect,useRef} from 'react'
import './index.css';

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed,setnumAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [password,setpassword] = useState("")
  const [copied, setCopied] = useState(false);

  //UseRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str+= "!@#$%^&*"
    for(let i=1; i<= length ;i++){
      let randomIndex = Math.floor(Math.random() * str.length)
      pass += str[randomIndex]
    }
    setpassword(pass) 


  },[length,numAllowed,charAllowed,setpassword])

  const copyPasswordToClipboard  = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
    setCopied(true);
    setTimeout(()=>{
      setCopied(False);
    },2000)
  },[password])


  useEffect(() =>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className="flex justify-center mt-10">
      <div className='w-full max-w-2xl shadow-md rounded-lg px-8 py-8 my-8 text-yellow-500 bg-gray-800 text-lg font-semibold'>
      <h1 className="text-white text-center my-3 font-bold text-3xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white text-gray-500"
          placeholder='Password'
          readOnly
          ref={passwordRef}
           />
           <button
           onClick={copyPasswordToClipboard}
           className="outline-none bg-blue-700 text-white px-4 py-1 shrink-0 hover:bg-green-600 cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out "
           >Copy</button>
        </div>
        <div className="flex text-sm gap-x-12 text-xl font-bold">
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max = {100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(parseInt(e.target.value))}}
             />
            <label >Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="w-6 h-6"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setnumAllowed((prev) => !prev);
              }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            className="w-6 h-6"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={(()=>{
              setcharAllowed((prev)=>!prev);
            })}
          />
          <label
          htmlFor="characterInput">
            Character
          </label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
