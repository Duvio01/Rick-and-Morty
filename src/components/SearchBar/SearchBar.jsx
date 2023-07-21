import { useState } from "react";
import style from './search.module.css'

export default function SearchBar(props) {
   const [id, setId] = useState('')

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <div className={style.container}>
         <input placeholder="id..." onChange={handleChange} value={id} type='search' onKeyUp={event => {
            if(event.key === "Enter"){
               props.onSearch(id)
               setId('')
            } 
            }}/>
         <button onClick={() => {
            props.onSearch(id)
            setId('')
         } }>Agregar</button>
      </div>
   );
}
