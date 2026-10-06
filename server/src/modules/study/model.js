import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  order: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  }
}, { timestamps: true });

const StudySessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  files: [{
    name: String,
    url: String,
    fileType: String,
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  modules: [ModuleSchema],
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
  },
}, { timestamps: true });

const StudySession = mongoose.model('StudySession', StudySessionSchema);
export default StudySession;
