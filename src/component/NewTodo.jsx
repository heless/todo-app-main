import PropTypes from 'prop-types'
import Checkbox from './Checkbox'
import Icon from '../assets/Images'

function NewTodo({ handledelete , todo, onToggle , isDarkTheme }) {
  

return (
    <li  className={`' flex items-center gap-3 p-4 border-b border-gray-700' 
                    ${isDarkTheme ? 'text-dark-LightGrayishBluehover' :'text-light-veryDarkGrayishBlue' }`
                    }>
      <Checkbox checked={todo.completed} onClick={onToggle} />
      <span className={`
          ${todo.completed ? 'line-through text-gray-500' : ''} 
        `}>
        {todo.nom}
      </span>

      <button className='ml-auto'>
        <img src={Icon.crossIcon} onClick={handledelete} alt="icon delete" />
      </button>
    </li>
  )
}



NewTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  isDarkTheme :PropTypes.bool,
  handledelete:PropTypes.func
}

export default NewTodo