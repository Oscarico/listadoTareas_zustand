import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { DraftTarea, Tarea } from "../types";
import { devtools, persist } from "zustand/middleware";

type TareasState = {
  tareas: Tarea[];
  activarId: Tarea["id"] | null; // Cambiado a null para lógica booleana limpia
  agregarTarea: (data: DraftTarea) => void;
  eliminarTarea: (id: Tarea["id"]) => void;
  obtenerTareaPorId: (id: Tarea["id"]) => void;
  actualizarTarea: (data: Tarea) => void; // Recibe Tarea completa
};

export const useTareasStore = create<TareasState>()(
  devtools(
    persist((set) => ({
      tareas: [],
      activarId: null,

      // store.ts
      agregarTarea: (data) => {
        // Creamos un objeto totalmente nuevo para el estado
        const nuevaTarea: Tarea = {
          id: uuidv4(),
          tarea: data.tarea,
          fecha: data.fecha,
          descripcion: data.descripcion,
        };

        set((state) => ({
          // Creamos un nuevo array, no modificamos el anterior
          tareas: [...state.tareas, nuevaTarea],
          activarId: null, // Aseguramos que el modo edición esté apagado
        }));
      },

      eliminarTarea: (id) => {
        set((state) => ({
          tareas: state.tareas.filter((t) => t.id !== id),
          // Si eliminamos la que estamos editando, limpiamos el ID
          activarId: state.activarId === id ? null : state.activarId,
        }));
      },

      obtenerTareaPorId: (id) => {
        set(() => ({ activarId: id }));
      },

      actualizarTarea: (data) => {
        set((state) => ({
          tareas: state.tareas.map((t) =>
            t.id === state.activarId ? { ...data, id: state.activarId } : t,
          ),
          activarId: null, // Esto disparará el useEffect para limpiar el form
        }));
      },
    }),
    {
      name: "tareas-storage",
    },)
  ),
);
