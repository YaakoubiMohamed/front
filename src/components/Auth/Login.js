// Login.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

function Login() {
  const navigate = useNavigate(); // Call useNavigate outside the callback
const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data) {
          // L'utilisateur a été enregistré avec succès
          // Vous pouvez rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions ici
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          navigate('/profile');
        } else {
          // Il y a eu une erreur lors de l'enregistrement de l'utilisateur
          // Vous pouvez afficher un message d'erreur ou effectuer d'autres actions ici
          setError("problem d'inscription")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
