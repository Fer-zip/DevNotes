import mongoose from 'mongoose';

const TabSchema = new mongoose.Schema({
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  name: { type: String, required: true },
  content: { type: String, default: '' }
}, { timestamps: true });

const ThemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true });

// Añadir virtual populate si queremos luego poblar tabs automáticamente, 
// pero en este caso haremos una query manual para mantenerlo simple.

export const Tab = mongoose.model('Tab', TabSchema);
export const Theme = mongoose.model('Theme', ThemeSchema);
