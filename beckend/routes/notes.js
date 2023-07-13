const express = require('express')
const router = express.Router()
const fetchUser=require('../middleware/fetchUser')
const Notes=require('../module/Note')
const { body, validationResult } = require('express-validator');
const Note = require('../module/Note');
//fetch the notes
router.get('/fetchNotes',fetchUser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes)  
    } catch (err) {
        console.error(err);
    res.status(500).json({err:"Internal server error"})
    }
})
//add notes
router.post('/addNotes',fetchUser,[
    body('title',"enter atleast 3 character of title").isLength({min:3}),
    body('description',"enter atleast 10 character of description").isLength({min:10})
 ], async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({result:result.array()});
    }   
    const note=new Notes({
       title,description,tag,user:req.user.id
    })
    const savedNote=await note.save()
    res.send(savedNote);
 }catch(err){
 console.error(err);
 res.status(500).json({err:"Internal server error"});
 }
 })
 //update note
 router.put('/updateNote/:id',fetchUser,async (req,res)=>{
    try {
        const {title,description,tag}=req.body
        //create new note
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note)

    } catch (err) {
        console.error(err);
    res.status(500).json({err:"Internal server error"})
    }
    
 })
  //Delete note
  router.delete('/deleteNote/:id',fetchUser,async (req,res)=>{
    try {
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        //allow deletio
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note:note})

    } catch (err) {
        console.error(err);
    res.status(500).json({err:"Internal server error"})
    }
    
 })
module.exports=router;