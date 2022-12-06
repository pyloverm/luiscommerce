import { getFamilias } from "../../src/data"

export default async function handler(req, res) {
    const result = await getFamilias();
    res.json(result);
  }