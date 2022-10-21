import express, { application } from "express"
import { 
    createCourse, 
    updateCourse, 
    deleteCourse, 
    getCourse, 
    countByTitle 
} from "../controllers/course.js"
const router = express.Router();

router.post("/create", createCourse);
router.post("/update/:id", updateCourse);
router.post("/delete/:id", deleteCourse);
router.get("/fetch/:id", getCourse);
router.get("/countByTitle", countByTitle)


export default router;