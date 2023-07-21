import { connect, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from '../Cards/cards.module.css'
import { filterCards, orderCards } from "../../redux/actions";
import styleF from './favorites.module.css'

const Favorites = (props) => {

    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    return (
        <>
            {
                props.allCharacters.length === 0 ? (
                    <div className={styleF.divSinContenido}>
                        <h1>No se han agregado personajes favoritos</h1>
                    </div>
                ) : (
                    <div>
                        <div className={styleF.containerSelects}>
                            <div>
                                <label>Ordenar: </label>
                                <select onChange={handleOrder}>
                                    <option value='A'>Ascendente</option>
                                    <option value='D'>Descendente</option>
                                </select>
                            </div>
                            <div>
                                <label>Filtrar: </label>
                                <select onChange={handleFilter}>
                                    <option value=''></option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Genderless'>Genderless</option>
                                    <option value='unknown'>unknown</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.container}>
                            {props.myFavorites.map((favorite) => {
                                return (
                                    <Card
                                        key={favorite.id}
                                        id={favorite.id}
                                        name={favorite.name}
                                        status={favorite.status}
                                        species={favorite.species}
                                        gender={favorite.gender}
                                        // origin={favorite.origin.name}
                                        image={favorite.image}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites,
        allCharacters: state.allCharacters
    };
}

export default connect(mapStateToProps, null)(Favorites);
