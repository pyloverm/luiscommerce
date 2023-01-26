import { verify } from "jsonwebtoken";

export default async function (req, res) {
    const { cookies } = req;
    const secret = process.env.SECRET;

    const jwt = cookies.OursiteJWT;
    try {
        verify(jwt,secret)
        res.status(200).json({resp:'true'});
    } catch (error) {
        res.status(400).json({resp:'false'});
    }
}
  