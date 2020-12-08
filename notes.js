const fs = require('fs')
const jsonConcat = require('json-concat')
const chalk = require('chalk')

const getNotes = function(){
    return 'Your Notes...'
}

//Load notes
const loadNotes = () =>{
    
    //see if json file has anything listed
    try{
        //get JSON array buffered
       const dataBuffer = fs.readFileSync('notes.json')
       //convert array to string format
       const dataString = dataBuffer.toString()
       //return data in javascript object
       return JSON.parse(dataString)
    }
//catch error(nothing listed in json file)
    catch(e){
        //return empty array
        return[]
    }

}
//Add note to array
const addNote = (title, body) => {
    //get value of json object array
    const notes = loadNotes()
    //check each item in array and return objects that are the same as the title inserted
    const duplicateNotes = notes.filter((note) =>{
        return note.title === title
    })
    //return value that is equal to title
    const duplicateNote = notes.find((note) => note.title === title)
    //check if duplicateNote has no value
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
    }
    //check if there are duplicates
    else{
        console.log('Duplicate')
    }


}

//remove note from array object
const removeNote = (title) =>{
    //get object array of notes
    const notes = loadNotes()
    //create new array of notes to keep
    const notesToKeep = notes.filter((note) =>{
        //return notes that don't have the same title as the one inserted
        return note.title !== title
    })
    //if note to remove isn't found
    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen.black('Removing Note'))
        //save new array to JSON file
        saveNote(notesToKeep)
    }
    else{
        console.log(chalk.bgRed.black('No note found!'))
    }

    
}

//Save array to notes.js
const saveNote = (noteArray) => {
    //convert javascript object to JSON string
    const dataJSON = JSON.stringify(noteArray)
    fs.writeFileSync('notes.json', dataJSON)

}
const listNotes = ()=>{
    //load object array of notes
    const notes = loadNotes()
    //check if there are any notes in array
    if(notes.length > 0){
        console.log(chalk.bgGreen.black('Your Notes'))
        //go through each object and log both title and body of object (object = note)
        notes.forEach(note => {
            console.log('Title: ' + note.title)
            console.log('Body: ' + note.body)
        })
    }
    else{
        console.log(chalk.bgRed.black('No Notes To List!'))
    }


}

const readNote = (title) =>{
    //load object array of notes
    const notes = loadNotes()
    //return object that has same title as one inserted
    const noteToRead = notes.find((note) => 
        note.title === title
    )
    //check if noteToRead has value
    if(noteToRead){
        console.log('Title: ' + noteToRead.title)
        console.log('Body: ' + noteToRead.body)
    }
    else{
        console.log(chalk.bgRed.black('Note Not Found!'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    ListNotes: listNotes,
    ReadNote: readNote
}