const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const log = require('./log/log.js');
const args = require('./log/args.js');
const argv = yargs
    .command('add', 'Add a new note', {
        title : {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        },
        body : {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title : {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .help()
    .argv;

var command = process.argv[2];
console.log('command: ', command);
console.log('Yargs: ', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        log.logNote(note);
        } else {
            console.log('The title ', argv.title, ' exists in the file');
        }

} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log('Printing', allNotes.length, 'notes(s)');
    allNotes.forEach((note) => {
        log.logNote(note);
    })
}

 else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        log.logNote(note);
    } else {
        console.log('Note by given title not found')
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Not not found';
    console.log(message);
} else {
    console.log('Input undefined');
}