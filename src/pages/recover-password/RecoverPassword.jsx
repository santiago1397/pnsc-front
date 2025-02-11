import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../api/auth';

export default function RecoverPassword() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {

    try {
      setIsLoading(true)
      const message = await forgotPassword(data.email)
      toast.success(message.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false)

    } catch (error) {
      toast.error("error al recuperar contraseña", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false)
    }
  };




  useEffect(() => {
    if (isAuthenticated) {
      toast.dismiss();
      navigate("/form");
    }
  }, [isAuthenticated]);




  return (
    <div className="app">

      <form className="credentials-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Recuperar Contraseña</h2>

        <p>ingrese su correo para recuperar</p>


          <div className="error-wrapper">
            <div className="login__box">
              <div className="login__box-input">
                <input type="email" required className="login__input" placeholder=" " {...register('email', { required: 'Email es requerido', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Formato invalido de correo' }, maxLength: { value: 40, message: 'el correo debe tener maximo 40 caracteres' } })} />
                <label htmlFor="login-pass" className="login__label">Email</label>
              </div>
            </div>
            {errors.email && <span className="error-mssg">{errors.email.message}</span>}

          </div>

          

        <button disabled={isLoading} className="credentials-btn" type="submit">
          {
            isLoading ?
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="loader"></div>
              </div>
              :
              "Recuperar"
          }
        </button>

        <p>¿Ya estas registrado?  <Link to='/login'>Ingresa</Link> </p>
      </form>

    </div>
  )
}
