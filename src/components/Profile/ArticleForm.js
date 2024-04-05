// ArticleForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './ArticleForm.css';

const validationSchema = Yup.object({
  titre: Yup.string().required('Requis'),
  contenu: Yup.string().required('Requis'),
  tags: Yup.string().required('Requis'),
  categorie: Yup.string(),
  statut: Yup.string().oneOf(['publie', 'draft']),
  image: Yup.string()
  .test('is-image',' le fichie jpg,png', value =>{
    const ext = value.split('.');
    const extension = ext[ext.length -1]
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase());
  })
  // file: Yup.mixed()
  // .required('')
  // .test('fileformat','unsoprted format', value =>{
  //   return value && ['application/pdf'].includes(value.type)
  // })
});

function ArticleForm({ article, onSubmit, onCancel }) {
  const formik = useFormik({
    initialValues: article || {
      titre: '',
      contenu: '',
      tags: '',
      categorie: '',
      statut: 'draft',
      image: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="titre">Titre</label>
      <input
        id="titre"
        name="titre"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.titre}
      />
      {formik.errors.titre ? <div>{formik.errors.titre}</div> : null}

      <label htmlFor="contenu">Contenu</label>
      <textarea
        id="contenu"
        name="contenu"
        onChange={formik.handleChange}
        value={formik.values.contenu}
      />
      {formik.errors.contenu ? <div>{formik.errors.contenu}</div> : null}

      <label htmlFor="tags">Tags</label>
      <input
        id="tags"
        name="tags"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.tags}
      />
      {formik.errors.tags ? <div>{formik.errors.tags}</div> : null}

      <label htmlFor="categorie">Catégorie</label>
      <input
        id="categorie"
        name="categorie"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.categorie}
      />
      {formik.errors.categorie ? <div>{formik.errors.categorie}</div> : null}

      <label htmlFor="statut">Statut</label>
      <select
        id="statut"
        name="statut"
        onChange={formik.handleChange}
        value={formik.values.statut}
      >
        <option value="draft">Brouillon</option>
        <option value="publie">Publié</option>
      </select>
      {formik.errors.statut ? <div>{formik.errors.statut}</div> : null}

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="file"
        onChange={formik.handleChange}
        value={formik.values.image}
      />
      {formik.errors.image ? <div>{formik.errors.image}</div> : null}

      <button type="submit">Submit</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default ArticleForm;
