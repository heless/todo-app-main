import { useState, useCallback, useEffect } from 'react'
import icon from './assets/Images'
import TodoForm from './component/TodoForm'
import NewTodo from './component/NewTodo'

function App() {
  const [formTodo, setFormTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [isDarkTheme, setIsDarkTheme] = useState(null)
  const [iconMode, setIconMode] = useState(icon.moonIcon)

  // Vérifier et appliquer la préférence du système ou de l'utilisateur
  useEffect(() => {
    const userPreference = localStorage.getItem('theme')
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (userPreference) {
      setIsDarkTheme(userPreference === 'dark')
    } else {
      setIsDarkTheme(systemPreference)
    }
  }, [])

  // Mettre à jour le thème et sauvegarder la préférence de l'utilisateur
  useEffect(() => {
    if (isDarkTheme === 'null') return;

    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkTheme])

  // Récupérer les todos sauvegardés dans le localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Sauvegarder les todos dans le localStorage dès que la liste est modifiée
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const toggleIsDarkMode = () => {
    setIconMode(iconMode === icon.moonIcon ? icon.sunIcon : icon.moonIcon)
    setIsDarkTheme(!isDarkTheme)
  }

  // Fonction pour ajouter un todo
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formTodo.trim() !== "") {
      const newTodo = { id: Date.now(), nom: formTodo, completed: false }
      setTodos([...todos, newTodo])
      setFormTodo("") // Réinitialiser le champ de texte
    }
  }

  // Fonction pour basculer l'état d'un todo (completed / non completed)
  const toggleTodo = useCallback((id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [todos])

  // Fonction pour supprimer un todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  // Réinitialiser la liste des todos complétés
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // Filtrer les todos (all, active, completed)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Activer les couleurs en fonction du filtre sélectionné
  const activeColorsAll = filter === 'all' ? 'text-primary-brightBlue' : null
  const activeColorsActive = filter === 'active' ? 'text-primary-brightBlue' : null
  const activeColorsCompleted = filter === 'completed' ? 'text-primary-brightBlue' : null

  return (
    <main className={`min-h-screen flex flex-col ${isDarkTheme ? 'bg-dark-veryDarkBlue' : 'bg-light-veryLightGray'} `}>

      <div className={`h-64  flex flex-col justify-start pt-12 bg-cover
        ${isDarkTheme ? "bg-[url('./assets/images/bg-desktop-dark.jpg')]" :
        "bg-[url('./assets/images/bg-desktop-light.jpg')]"}      
      `}>

        <div className="w-10/12 lg:w-2/5 max-w-2xl mx-auto px-4 ">
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-2xl font-bold tracking-wide text-light-veryLightGray">
              T O D O
            </h1>
            <img className='h-5' src={iconMode} onClick={toggleIsDarkMode} alt="theme toggle" />
          </div>
          <TodoForm
            value={formTodo}
            onChange={(e) => setFormTodo(e.target.value)}
            onSubmit={handleSubmit}
            isDarkTheme={isDarkTheme}
            placeholder='Create a new todo..'
          />
        </div>
      </div>

      <div className=" flex-grow flex items-start justify-center px-4 -mt-8">

        <div className={`flex flex-col w-10/12 lg:w-2/5  max-w-2xl shadow-lg rounded-md overflow-hidden ${isDarkTheme ? 'bg-dark-veryDarkDesaturatedBlue' : 'bg-light-veryLightGray text-light-darkGrayishBlue'}`}>

          <div className='flex-grow overflow-y-auto max-h-[calc(100vh-250px)]'>
            <ul>
              {filteredTodos.map((todo) => (
                <NewTodo
                  isDarkTheme={isDarkTheme}
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  handledelete={() => handleDelete(todo.id)}
                />
              ))}
            </ul>
          </div>

          <div className='px-2 border-t border-gray-700 '>
            <div className='flex justify-between items-center'>
              <span className='cursor-default text-1'>{todos.filter(t => !t.completed).length} items left</span>

              <div className='hidden md:space-x-2 md:p-4 md:flex'>
                <button onClick={() => setFilter('all')} className={`
                  ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsAll}` :
                  `${activeColorsAll} hover:text-light-veryDarkGrayishBlue`} 
                `}>All</button>

                <button onClick={() => setFilter('active')} className={`
                  ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsActive}` :
                  `${activeColorsActive} hover:text-light-veryDarkGrayishBlue`} 
                `}>Active</button>

                <button onClick={() => setFilter('completed')} className={`
                  ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsCompleted}` :
                  `${activeColorsCompleted} hover:text-light-veryDarkGrayishBlue`} 
                `}>Completed</button>
              </div>

              <button
                onClick={clearCompleted}
                className={`
                  ${isDarkTheme ? 'hover:text-dark-LightGrayishBluehover' :
                  'hover:text-light-veryDarkGrayishBlue'} 
                `}>
                Clear Completed
              </button>
            </div>

          </div>
          <div className='space-x-2 rounded-md mt-2 text-center md:hidden'>
                  <button onClick={() => setFilter('all')} className={`
                    ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsAll}` :
                    `${activeColorsAll} hover:text-light-veryDarkGrayishBlue`} 
                  `}>All</button>

                  <button onClick={() => setFilter('active')} className={`
                    ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsActive}` :
                    `${activeColorsActive} hover:text-light-veryDarkGrayishBlue`} 
                  `}>Active</button>

                  <button onClick={() => setFilter('completed')} className={`
                    ${isDarkTheme ? `hover:text-dark-LightGrayishBluehover ${activeColorsCompleted}` :
                    `${activeColorsCompleted} hover:text-light-veryDarkGrayishBlue`} 
                  `}>Completed</button>
          </div>
        </div>


      </div>
    </main>
  )
}

export default App
