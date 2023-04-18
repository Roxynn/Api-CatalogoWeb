// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isValid: boolean;
};

const users = [
  {
    nombre: "admin",
    password: "123",
  },
  {
    nombre: "test",
    password: "123",
  },
  {
    nombre: "test_1",
    password: "123",
  },
];

export default function handler({ body }: NextApiRequest, res: NextApiResponse<Data>) {
  const { nombre, password } = JSON.parse(body);

  const userFiltering = users.filter((x) => x.nombre === nombre);

  if (userFiltering.length > 0) {
    res.status(200).json({ isValid: userFiltering[0].password === password });
  } else {
    res.status(200).json({ isValid: false });
  }
}
