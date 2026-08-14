/**
 * BirrDB-backed Notes store.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Uses BirrDB (IndexedDB-backed in the browser) for production persistence,
 * with a localStorage fallback for resilience.
 */
import { BirrDB, type Collection } from 'birrstack-db';
import { loadJSON, saveJSON } from './storage';

export interface Note {
  id: string;
  title: string;
  body: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

let dbPromise: Promise<BirrDB | null> | null = null;
let notesCollection: Collection | null = null;

async function getDB(): Promise<BirrDB | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return null;
  if (!dbPromise) {
    dbPromise = BirrDB.open('muslimos', { autoPersist: true })
      .then(db => {
        notesCollection = db.collection('notes', {
          columns: [
            { name: 'id',       type: 'string' },
            { name: 'title',    type: 'string', nullable: true },
            { name: 'body',     type: 'string', nullable: true },
            { name: 'color',    type: 'string', nullable: true },
            { name: 'createdAt',type: 'number' },
            { name: 'updatedAt',type: 'number' },
          ],
        });
        return db;
      })
      .catch(err => {
        console.warn('BirrDB unavailable, falling back to localStorage', err);
        return null;
      });
  }
  return dbPromise;
}

function rowToNote(row: any): Note {
  return {
    id: String(row.id ?? ''),
    title: String(row.title ?? ''),
    body: String(row.body ?? ''),
    color: String(row.color ?? '#05B34D'),
    createdAt: Number(row.createdAt ?? Date.now()),
    updatedAt: Number(row.updatedAt ?? Date.now()),
  };
}

/** Load all notes, preferring BirrDB but falling back to localStorage. */
export async function loadNotes(): Promise<Note[]> {
  const db = await getDB();
  if (db && notesCollection) {
    try {
      const rows = notesCollection.all();
      const notes = rows.map(rowToNote).sort((a, b) => b.updatedAt - a.updatedAt);
      // Mirror to localStorage for offline resilience
      saveJSON('notes:all', notes);
      return notes;
    } catch (e) {
      console.warn('BirrDB load failed, using localStorage', e);
    }
  }
  return loadJSON<Note[]>('notes:all', []);
}

export async function saveNote(note: Note): Promise<void> {
  const db = await getDB();
  if (db && notesCollection) {
    try {
      // Try to update first; if no row, insert
      const existing = notesCollection.all().find(r => r.id === note.id);
      if (existing) {
        notesCollection.update((existing as any)._id ?? existing.id, {
          title: note.title, body: note.body, color: note.color, updatedAt: Date.now(),
        });
      } else {
        notesCollection.insert({ ...note, updatedAt: Date.now() });
      }
      return;
    } catch (e) {
      console.warn('BirrDB save failed, using localStorage', e);
    }
  }
  // Fallback: rewrite entire localStorage list
  const list = await loadNotes();
  const idx = list.findIndex(n => n.id === note.id);
  if (idx >= 0) list[idx] = note; else list.unshift(note);
  saveJSON('notes:all', list);
}

export async function deleteNote(id: string): Promise<void> {
  const db = await getDB();
  if (db && notesCollection) {
    try {
      const rows = notesCollection.all();
      const existing = rows.find(r => r.id === id);
      if (existing) notesCollection.delete((existing as any)._id ?? existing.id);
    } catch (e) {
      console.warn('BirrDB delete failed', e);
    }
  }
  const list = await loadNotes();
  saveJSON('notes:all', list.filter(n => n.id !== id));
}
