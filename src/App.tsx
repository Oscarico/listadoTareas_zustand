import { ToastContainer } from "react-toastify"
import { FormularioTareas } from "./components/FormularioTareas"
import { ListaTareas } from "./components/ListaTareas"
import { useTareasStore } from "./stores/store"

function App() {
  
  const activarId = useTareasStore(state => state.activarId)
  const tareas = useTareasStore(state => state.tareas)

  return (
    <>
      <div className="bg-gray-100 min-h-screen pb-10">
        <div className="container mx-auto pt-10 md:pt-20">
          <h1 className="font-black text-4xl text-center md:w-2/3 md:mx-auto">Mis <span className="text-blue-600">Tareas!</span></h1>

          <div className="mt-12 flex flex-col md:flex-row gap-5 items-start">
            <FormularioTareas key={activarId ? activarId : tareas.length} />
            <ListaTareas />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
