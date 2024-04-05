// Register.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  nom: Yup.string().required('Required'),
  prenom: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(10, 'Le mot de passe doit comporter au moins 10 caractères')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(/\W/, 'Le mot de passe doit contenir au moins un caractère spécial'),
});

function Register() {
  const navigate = useNavigate(); // Call useNavigate outside the callback
const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // L'utilisateur a été enregistré avec succès
          // Vous pouvez rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions ici
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
      <label htmlFor="nom">Nom</label>
      <input
        id="nom"
        name="nom"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.nom}
      />
      {formik.errors.nom ? <div>{formik.errors.nom}</div> : null}

      <label htmlFor="prenom">Prénom</label>
      <input
        id="prenom"
        name="prenom"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.prenom}
      />
      {formik.errors.prenom ? <div>{formik.errors.prenom}</div> : null}

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

export default Register;
