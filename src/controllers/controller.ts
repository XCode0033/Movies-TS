import express from "express";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

interface Movie  {
    id:number;
    title:string;
    director:string;
    year:number;
    
}

let movies:Movie[] = [
    {id:1, title:"Pacific Rim", director: 'Guillermo Del Torro', year: 2013},
    {id:2, title:"Angry Birds", director: 'Peter Griffin', year: 2018},
    {id:3, title:"Moana", director: 'The Rock', year: 2017},
    {id:4, title:"Iron Man III", director: 'Stan Lee', year: 2008},
];
let nextId = 5;

type CreateMovieBody = Omit<Movie, "id">
type PatchMovieBody = Partial<Omit<Movie, "id">>
 
export const getAllMovies = (req: Request<{id:string}>, res:Response) => {
    res.render("index", {
        movies
    })
}


export const getMovieById = (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const movie = movies.find((m) => m.id === id)

    if(!movie) {
        throw new ApiError(404, 'No movie found --threw')
    }

    res.render("movieId", {
        movie
    })
}


export const createMovie = (
    req:Request<{}, {}, CreateMovieBody>, 
    res:Response, ) => {
    const { title, director, year} = req.body;
    
    const createdMovie: Movie = {
        id: nextId ++,
        title,
        director,
        year
    };

    movies.push(createdMovie)
    console.log(`Movie created!` )
    res.render("index", {movies})
}

export const getEditPage = (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const movie = movies.find((m) => m.id === id)

    if(!movie) {
        throw new ApiError(404, 'No movie found. --threw.')
    }
    res.render("edit", {movie})
}


export const patchMovie = (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const movie = movies.find((m) => m.id === id)

    if(!movie) {
        throw new ApiError(404, 'No movie found by this id')
    }

    movie.title = req.body.title || movie.title;
    movie.director = req.body.director || movie.director
    movie.year = req.body.year ? Number(req.body.year) : movie.year

    res.redirect(`/${movie.id}`)

}

export const updateMovie = (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const index = movies.findIndex((m) => m.id === id)
    if(index === -1) {
        throw new ApiError(404,'No movie found.')
    }
    const updatedMovie: Movie = {
        id,
        title: req.body.title,
        director: req.body.director,
        year: Number(req.body.year),
    };

    movies[index] = updatedMovie;

    res.redirect(`/${id}`)
}
export const deleteMovie = (req:Request<{id:string}>, res:Response) =>{
    const id = Number(req.params.id)
    const movieExists = movies.some((m) => m.id === id)

    if(!movieExists) {
        throw new ApiError(404, "No movie found.")
    }
    movies = movies.filter((m) => m.id !== id)
    console.log('movie deleted!')
    res.redirect("/")
}

