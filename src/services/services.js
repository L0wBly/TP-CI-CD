import { errorCondition } from "../helper/errorcondition.js"
import { Film, filmValidation } from "../models/model.js"



export const postFilm = async (req, res) => {
    const { error, value } = filmValidation.validate(req.body)

    errorCondition(error)

    const newFilm = new Film(
      req.body
    )
    const addFilm = await newFilm.save()
    res.status(201).json(addFilm)
}


 

export const getFilms = async (req, res) => {
  const filmsListe = await Film.find()
  res.send(filmsListe)
}


 

export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)

    if (!film) {
      return res.status(404).json({ message: `Film id : ${req.params.id} non trouvé` })
    }
    res.status(200).json(film)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Une erreur est survenue" });
  }
}

export const deleteFilm = async (req, res) => {
    const delFilm = await Film.findByIdAndDelete(req.params.id)
    if (!delFilm) {
      return res.status(404).Json({ message: "Film non trouvé" })
    }
    res.status(204).end()
}

export const putFilm = async (req, res) => {
  try {
    const { error, value } = filmValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const majFilm = await Film.findByIdAndUpdate(req.params.id, {
      titre: req.body.titre,
      annee: req.body.annee
    }, { new: true })

    if (!majFilm) {
      return res.status(404).json({ message: "Film non trouvé " })
    }
    res.status(200).json(majFilm)

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}