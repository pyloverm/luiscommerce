/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://poor-camera.pockethost.io');

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;
  
  // Check in the database
  // if a user with this username
  // and password exists

  const authData = await pb.collection('users').authWithPassword(username, password);
  if (pb.authStore.isValid) {
    const token = sign(
      {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      secret
    );
    
    console.log('secret loging ')
    console.log(secret)
    console.log(token)
    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    console.log('secret loging ')
    console.log(secret)
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
