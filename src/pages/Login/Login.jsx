import React, { useState, useEffect } from 'react'
import { useAuth } from "../../context/authContext";
import { useForm } from 'react-hook-form';
import { ToastError } from '../../components/toasts/ToastError'
import { Link, useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await signin(data)
      if (response.value === false) ToastError(response.response)
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (user.role.role <= 2) {
        navigate("/schedule")
      } else {
        navigate(`/schedule`);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="image-container">
            <img className="logo" src="./logo-solo.png" alt="logo-semillero" />
          </div>

          <h1 className='welcome'>
            Bienvenido
          </h1>
          <p className="login-message">
            Por favor ingresa tus credenciales
          </p>
          <div className="login-inputs">
            <input type="text" id="user" className="input-field" placeholder='Correo electronico' required
              {...register('email', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Formato invalido de email',
                },
              })} />

            <input type="password" id="pass" className="input-field" placeholder='Contraseña' required
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'la contraseña es de al menos 8 caracteres de largo'
                }
              })} />
          </div>


          <div className="login-button">
            <button>
              INGRESAR
            </button>
          </div>

          <div className="forgot-password">
            <p> <Link to='/forgot-password'>¿olvidó su contraseña? <b>Recuperar</b></Link></p>
          </div>



        </form>

      </div>

    </div>
  )
}
