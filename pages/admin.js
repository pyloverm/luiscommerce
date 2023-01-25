import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    setIsLoading(true)
    setError(false);
    e.preventDefault();

    const credentials = { username, password };
    try {
        const user = await axios.post("/api/auth/login", credentials)
        if(user && user.status === 200){
            setIsLoading(false)
            router.push('/dashboard/users')
        }
    
        console.log(user);
        console.log(error);
    } catch (e) {
        setError(true)
        setIsLoading(false)
    }
  };


  return (
    <div className="column-fl">
      <form className="form-us" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Nome de utilizador</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Palavra passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div class='load-more'>
            <button className={isLoading ? 'button loading' : 'button'}>
                Iniciar Sessão
                <div></div>
            </button>
        </div>
       
        <div className={`${!error ? "hidden" : "mail-user-fail"}`}>
            Senha ou e-mail incorrecto !
           
        </div>
      </form>
    </div>
  );
}
