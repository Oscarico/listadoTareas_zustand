export type Tarea = {
  id: string;
  tarea: string;
  fecha: string;
  descripcion: string;
};

export type DraftTarea = Omit<Tarea, "id">;