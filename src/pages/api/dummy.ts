// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Poster } from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse<Poster[]>) {
  res
    .status(200)
    .json([
      {
        Id: 1,
        Año: new Date(),
        AñoC: new Date(),
        Director: "Jhon",
        Genero: "Comedia",
        Poster: "",
        Titulo: "Jhon Doe",
      },
      {
        Id: 2,
        Año: new Date(),
        AñoC: new Date(),
        Director: "Jhon",
        Genero: "Pene",
        Poster: "",
        Titulo: "Jhon Doe",
      },
      {
        Id: 3,
        Año: new Date(),
        AñoC: new Date(),
        Director: "Jhon",
        Genero: "Comedia",
        Poster: "",
        Titulo: "Jhon Doe",
      },
      {
        Id: 10,
        Año: new Date(),
        AñoC: new Date(),
        Director: "Jhon",
        Genero: "Comedia",
        Poster: "",
        Titulo: "Jhon Doe",
      },
    ]);
}
