import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from './detail.module.css'

const Detail = () => {

    const { id } = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`)
            .then(({ data }) => {
                setCharacter(data)
            }).catch(error => alert('El personaje no existe'))
        return setCharacter({})
    }, [id])


    return (
        <div>
            {character ? (
                <div className={style.container}>
                    <div>
                        <h1>{character.name}</h1>
                        <h2>STATUS | {character.status}</h2>
                        <h2>GENDER | {character.gender}</h2>
                        <h2>SPECIE | {character.species}</h2>
                        <h2>ORIGIN | {character?.origin?.name}</h2>
                    </div>
                    <div>
                        <img src={character.image} alt={character.name} />
                    </div>
                </div>
            ) : (
                <h1>El personaje no esta disponible</h1>
            )}
        </div>
    )
}

export default Detail