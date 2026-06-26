import { Router } from "express";
const router = Router();
import { createMovie, deleteMovie, getAllMovies, getEditPage, getMovieById, patchMovie, updateMovie } from "../controllers/controller";

router.get("/", getAllMovies)
router.get("/:id", getMovieById)
router.get("/:id/edit", getEditPage)

//post routes
router.post("/", createMovie)
router.put("/:id", updateMovie)
router.patch("/:id", patchMovie)
router.delete("/:id", deleteMovie)



export default router;




