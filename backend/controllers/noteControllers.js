const express = require('express');
const Note = require('../models/notesModel');

//get all notes
const getNotes = async (req, res) => {
try{
    const notes = await Note.find();
    res.status(200).json(notes);

}catch (error) {
    res.status(500).json({ message: 'could not get notes' });
} 
};

//get a speciific note by id
const getNoteById = async (req, res) => {
try{
    const { id } = req.params;
    const note = await Note.findById(id);
    if (note) {
        res.status(200).json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
} catch (error) {
    res.status(500).json({ message: 'could not get note' });
}
};

//create a note
const createNote = async (req, res) => {
try{
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);

}catch (error) {
    res.status(500).json({ message: 'could not create note' });
}
};

//update a note
const updateNote = async (req, res) => {
try{
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json(updatedNote);
} catch (error) {
    res.status(500).json({ message: 'could not update note' });
}
};

//delete a note
const deleteNote = async (req, res) => {
try{
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'could not delete note' });
}
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
};