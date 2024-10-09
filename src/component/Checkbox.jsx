import PropTypes from 'prop-types'
function Checkbox({checked,onClick}) {
  return (
    <input 
      type="checkbox" 
      checked={checked} 
      onClick={(e)=>onClick(e.target.checked)} 
      className='
          appearance-none self-center 
          w-6 h-6 rounded-full border-2    
        border-dark-LightGrayishBluehover
          checked:bg-[url("./assets/images/icon-check.svg")] 
          checked:bg-purple-500 
          checked:bg-no-repeat checked:bg-cover  
          cursor-pointer transition duration-200 ease-in-out'
      />
  )
}

Checkbox.propTypes ={
  checked : PropTypes.bool.isRequired,
  onClick : PropTypes.func.isRequired
}

export default Checkbox