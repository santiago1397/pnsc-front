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
    <div className="login">
      <div className="login-left-section">
        <img className="login-logo" src="./logo_semillero_1.svg" alt="logo-semillero" />

        <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>

          <div className="login_box">
            <div className="login-header">
              <span>Entrar</span>
            </div>

            <div className="imput-box">
              <input type="text" id="user" className="input-field" required
                {...register('email', {
                  required: 'El correo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Formato invalido de email',
                  },
                })} />
              <label htmlFor="user" className="label">Email</label>
              <i className='bx bx-user icon'></i>
            </div>

            <div className="imput-box">
              <input type="password" id="pass" className="input-field" required
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'la contraseña es de al menos 8 caracteres de largo'
                  }
                })} />
              <label htmlFor="pass" className="label">Contraseña</label>
            </div>

            <div className="button-wrapper">
              <button type="submit" className="input-submit">

                {
                  isLoading ?
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="loader"></div>
                    </div>
                    :
                    "Ingresar"
                }

              </button>
            </div>
            <p><Link to='/forgot-password'>Recuperar contraseña</Link> </p>
          </div>

        </form>
      </div>
      <div className="login-right-section">

      </div>
    </div>
  )
}
