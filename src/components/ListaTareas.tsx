import Swal from "sweetalert2";
import { useTareasStore } from "../stores/store";
import { toast } from "react-toastify";

export const ListaTareas = () => {
  const { tareas, eliminarTarea, obtenerTareaPorId } = useTareasStore();

  // Función para manejar la confirmación
  const handleClickEliminar = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      // Si el usuario da click en el botón de confirmar
      if (result.isConfirmed) {
        eliminarTarea(id); // Ejecutamos la acción del store
        
        toast.success("Tarea eliminada correctamente");
      }
    });
  };

  return (
    <div className="w-full md:w-3/5 lg:w-3/5 px-5 md:h-[75vh] md:overflow-y-auto">
      {tareas.length ? (
        <>
          <h2 className="font-black text-2xl text-center mb-10">Listado de <span className="text-blue-600">Tareas</span></h2>
          {tareas.map((tarea) => (
            <div key={tarea.id} className="mb-5 p-6 bg-white shadow-md rounded-xl border-l-8 border-blue-500">
              <p className="mb-2 uppercase text-gray-700 font-bold">Tarea: <span className="font-normal normal-case">{tarea.tarea}</span></p>
              <p className="mb-2 uppercase text-gray-700 font-bold">Fecha: <span className="font-normal normal-case">{tarea.fecha}</span></p>
              <p className="mb-2 uppercase text-gray-700 font-bold">Descripción: <span className="font-normal normal-case">{tarea.descripcion}</span></p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
                <button 
                  onClick={() => obtenerTareaPorId(tarea.id)} 
                  className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded w-full sm:w-auto"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleClickEliminar(tarea.id)} 
                  className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded w-full sm:w-auto"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="font-black text-2xl text-center">No hay <span className="text-blue-600">Tareas</span></h2>
      )}
    </div>
  );
};