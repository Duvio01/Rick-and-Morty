import { Link } from "react-router-dom";
import style from "./card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

export function Card(props) {

   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      props.myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true)
         }
      });
   }, [props.id, props.myFavorites])

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         props.removeFav(props.id);
      } else {
         setIsFav(true);
         console.log(props)
         props.addFav(props);
      }
   };

   return (
      <div className={style.container}>
         <div className={style.buttonFav}>
            {isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )}
         </div>
         <div className={style.divImg}>
            {
               props.onClose ? (
                  <button
                     className={style.buttonPosition}
                     onClick={() => props.onClose(props.id)}
                  >
                     X
                  </button>
               ) : null
            }

            <Link to={`/detail/${props.id}`}>
               <h2 className={style.nameOnImg}>{props.name}</h2>
            </Link>
            <img src={props.image} alt="Imagen Rick" />
            <div className={style.divDescripcion}>
               <h2>{props.species}</h2>
               <h2>{props.gender}</h2>
            </div>
         </div>
      </div>
   );
}

export function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites
   };
}

export function mapDispatchToProps(dispatch) {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id)),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
