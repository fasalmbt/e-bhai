import course from "../models/course.js"

export const createCourse = async (req, res, next) => {
    const newCourse = new course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        next(err);
    }
};

export const updateCourse = async (req, res, next) => {
    try {
        const updatedCourse = await course.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        next(err);
    }
}

export const deleteCourse = async (req, res, next) => {
    try {
        await course.findByIdAndDelete(req.params.id)
        res.status(200).send("Course deleted.")
    } catch (err) {
        next(err);
    }
}

export const getCourse = async (req, res, next) => {
    try{
        const cours = await course.findById(req.params.id)
        res.status(200).json(cours);
    }catch(err){
        next(err);
    }
}

export const countByTitle = async(req,res,next)=>{
    const titles = req.query.title.split(",");
  try {
    const list = await Promise.all(
      titles.map((title) => {
        return course.countDocuments({ title: title });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

