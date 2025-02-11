import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { resetPassword } from '../../api/auth';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { id, token } = useParams()

  const {  isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await resetPassword({id: id, password: data.password, token: token})
      toast.success(response.data, {
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
      toast.success("error al reiniciar la contraseña", {
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
    
    console.log(response.message)
    Cookies.remove("token");
    setIsLoading(false)

  };


  let pwd = watch("password");


  useEffect(() => {
    if (isAuthenticated) {
      toast.dismiss();
      navigate("/form");
    }
  }, [isAuthenticated]);





  return (
    <div className="app">

      <form className="credentials-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Reiniciar Contraseña</h2>
        <p>ingrese su nueva contraseña:</p>


        <div className="login__content">
          
          <div className="error-wrapper">
            <div className="login__box">
              <div className="login__box-input">
                <input type="password" required className="login__input" placeholder=" "
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    /* minLength: { value: 8, message: 'La contraseña debe ser de al menos 8 caracteres' },
                    maxLength: { value: 40, message: 'La contraseña solo permite un maximo de 40 caracteres' },
                    pattern: {
                      value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                      message: 'La contraseña debe contener una letra mayúscula, un número, y un carácter especial (!@#$%^&*)',
                    }, */
                  })} />
                <label htmlFor="login-pass" className="login__label">Contraseña</label>
              </div>
            </div>
            {errors.password && <span className="error-mssg">{errors.password.message}</span>}

          </div>

          <div className="error-wrapper">
            <div className="login__box">
              <div className="login__box-input">
                <input type="password" required className="login__input" placeholder=" "
                  {...register('confirmPassword', {
                    required: 'confirmar contraseña es necesario',
                    validate: { value: (val) => val === pwd || 'las contraseñas no coinciden' },
                  })} />
                <label htmlFor="login-pass" className="login__label">Repetir contraseña:</label>
              </div>
            </div>
            {errors.confirmPassword && <span className="error-mssg">{errors.confirmPassword.message}</span>}

          </div>
        </div>


        <button disabled={isLoading} className="credentials-btn" type="submit">
          {
            isLoading ?
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="loader"></div>
              </div>
              :
              "Cambiar"
          }
        </button>

        <p>¿Ya estas registrado?  <Link to='/login'>Ingresa</Link> </p>
      </form>

    </div>
  )
}
