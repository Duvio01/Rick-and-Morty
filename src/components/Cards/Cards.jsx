import Card from "../Card/Card";
import style from './cards.module.css'

export default function Cards(props) {
   return (
      <div>
         {
            props.loading ? (
               <div className={style.divCargando}>
                  <h1>Cargando...</h1>
               </div>
            ) : (
               <div className={style.container}>
                  {
                     props.characters.map((character) => {
                        return (
                           <Card
                              key={character.id}
                              id={character.id}
                              name={character.name}
                              status={character.status}
                              species={character.species}
                              gender={character.gender}
                              origin={character.origin.name}
                              image={character.image}
                              onClose={props.onClose}
                           />
                        );
                     })
                  }
               </div>
            )
         }
      </div>
   );
}
