const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

//Customize yargs version
yargs.version('1.1.0')

//add, remove, read, list

//Create add command
yargs.command({
    command:'Add',
    describe:'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Note description',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) =>{
        notes.addNote(argv.title, argv.body)
    }
})


//Create remove command
yargs.command({
    command:'Remove',
    describe: 'Remove a note',
    builder:{
        title:{
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) =>{
        notes.removeNote(argv.title)

    }
})


//Create list command
yargs.command({
    command:'List',
    describe: 'List notes',
    handler: (argv) =>{
        notes.ListNotes()
    }
})


//Create list command
yargs.command({
    command: 'Read',
    describe: 'Read a note',
    builder:{
        title:{
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) =>{
        notes.ReadNote(argv.title)
    }
})
yargs.parse()




