import { useForm } from "react-hook-form";
import { Error } from "./Error";
import type { DraftTarea } from "../types";
import { useTareasStore } from "../stores/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormularioTareas = () => {
  const { agregarTarea, activarId, tareas, actualizarTarea } = useTareasStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftTarea>({
    // Cargamos los valores iniciales directamente aquí
    defaultValues: activarId 
      ? tareas.find(t => t.id === activarId) 
      : { tarea: "", fecha: "", descripcion: "" }
  });

  const onSubmit = (data: DraftTarea) => {
    console.log("Datos capturados:", data); // Ahora sí vendrán llenos
    // Al usar la "key" en App.tsx, ya no necesitamos reset() manual 
    // porque el componente se destruirá y volverá a nacer limpio.
    if (activarId) {
      actualizarTarea({ ...data, id: activarId });
      toast.success("Tarea actualizada correctamente");
    } else {
      agregarTarea(data);
      toast.success("Tarea agregada correctamente");
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 px-5">
      <h2 className="font-black text-2xl text-center mb-10">
        {activarId ? "Editando" : "Añadir"}{" "}
        <span className="text-blue-600">Tarea</span>
      </h2>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="mb-5">
          <label
            htmlFor="tarea"
            className="text-sm uppercase font-bold text-gray-700"
          >
            Nombre
          </label>
          <input
            id="tarea"
            type="text"
            className="w-full p-3 border border-gray-200 rounded"
            // Asegúrate de que el register sea lo primero
            {...register("tarea", { required: "El nombre es obligatorio" })}
          />
          {errors.tarea && <Error>{errors.tarea.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="fecha"
            className="text-sm uppercase font-bold text-gray-700"
          >
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className="w-full p-3 border border-gray-200 rounded"
            {...register("fecha", { required: "La fecha es obligatoria" })}
          />
          {errors.fecha && <Error>{errors.fecha.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-sm uppercase font-bold text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="w-full p-3 border border-gray-200 rounded"
            {...register("descripcion", {
              required: "La descripción es obligatoria",
            })}
          />
          {errors.descripcion && <Error>{errors.descripcion.message}</Error>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-blue-700 transition-colors rounded shadow"
        >
          {activarId ? "Guardar Cambios" : "Registrar Tarea"}
        </button>
      </form>
    </div>
  );
};
