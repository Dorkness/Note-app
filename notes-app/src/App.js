import { useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const getStoredNotes = () => {
    try {
      const storedNotes = localStorage.getItem('react-notes-app-data');
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  };

  const [notes, setNotes] = useState(getStoredNotes());
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const saveNotes = (newNotes) => {
    try {
      localStorage.setItem('react-notes-app-data', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
      // Handle the error as needed
    }
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);

    // Save notes to localStorage whenever a new note is added
    saveNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    // Save notes to localStorage whenever a note is deleted
    saveNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
