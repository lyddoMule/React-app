import PropTypes from 'prop-types'
import Button from './btn'


const Header = ({title, onAdd,showAdd}) => {

  return (
    <header className='header'>
        <h1 >{title}</h1>
        <Button  color={showAdd? 'red':'green'} text={showAdd? 'Close': 'Add'} onclick={onAdd}/>

    </header>
  )
}
Header.defaultProps={
    title:'Task Tracker',
}
Header.propTypes={
    title: PropTypes.string.isRequired,
}
// }CSS IN JS
//<h1 style={{headingStyle}}></h1>
// const headingStyle= {
//     color:'purple',
//     backgroundColor:'black',
// }

export default Header
