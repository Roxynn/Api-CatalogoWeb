import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  mov: {
    id: number;
    movieId: string;
  }[];
};

const usersFavs = [
  { id: 1, movieId: "1,2,10" },
  { id: 2, movieId: "1,2,10" },
  { id: 3, movieId: "1,2,10" },
  { id: 10, movieId: "1,2,10" },
];

export default function handler({ query }: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = query;

  res
    .status(200)
    .json({ mov: usersFavs.filter((x) => x.id === parseInt((userId ?? "").toString())) });
}
