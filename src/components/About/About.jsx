import style from './about.module.css'
import imagenMia from './../Images/Duvan.png'
import htmlImg from './../Images/html.png'
import cssImg from './../Images/css.svg'
import javascriptImg from './../Images/javascript.png'
import reactImg from './../Images/react.png'
import redux from './../Images/redux.png'

const About = () => {

    const techSkills = [{ name: 'Html', image: htmlImg }, { name: 'Css', image: cssImg }, { name: 'JavaScript', image: javascriptImg }, { name: 'React', image: reactImg }, { name: 'Redux', image: redux }]

    return (
        <div className={style.container}>
            <div>
                <h1>Acerca de mi</h1>
            </div>
            <div className={style.containerImg}>
                <img src={imagenMia} alt={'Duvan'}/>
            </div>
            <div>
                <h2>Duvan Ramirez</h2>
                <h3>Me encuentro desarrollando esta aplicacion como metodo de aprendizaje bajo los siguientes lenguajes</h3>
            </div>
            <div style={{display:'flex'}}>
                {
                    techSkills.map((skill, index) => {
                        return (
                            <li className={style.listItem} key={index}>{skill.name}<img src={skill.image} alt={skill.name}/></li>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default About