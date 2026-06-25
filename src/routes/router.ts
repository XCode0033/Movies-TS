import { Router } from "express";
const router = Router();
import { createMovie, deleteMovie, getAllMovies, getMovieById } from "../controllers/controller";

router.get("/", getAllMovies)
router.get("/:id", getMovieById)


//post routes
router.post("/", createMovie)
router.post("/:id/delete", deleteMovie)
export default router;




