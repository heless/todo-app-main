import PropTypes from 'prop-types'
import Checkbox from './Checkbox'

function TodoForm({placeholder,value,onChange,onClick,checked,onSubmit,isDarkTheme}) {

  return (
    
    <form action="" onSubmit={onSubmit} className={`h-auto w-full p-1 mx-auto flex gap-x-4 ${isDarkTheme ?'bg-dark-veryDarkDesaturatedBlue':
      'bg-light-veryLightGray'} shadow-lg rounded-md`
    }>

        <Checkbox checked={checked} onClick={onClick}/>

        <input 
            className={`h-10 flex-1 relative self-center bg-transparent   focus:outline-none placeholder-neutral-darkTheme-darkGrayishBlue
              ${isDarkTheme ?'text-light-veryLightGray':
                ' text-dark-veryDarkDesaturatedBlue'
              } 
            `} 
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            
        />
        
    </form>
  )
}

TodoForm.propTypes ={
    placeholder: PropTypes.string,
    value : PropTypes.string.isRequired,
    checked:PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    isDarkTheme : PropTypes.bool
}
export default TodoForm