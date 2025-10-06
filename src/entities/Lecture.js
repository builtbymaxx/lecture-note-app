// Entity implementation for Lecture. Provides static methods to list
// lectures sorted by creation date and create new lecture records. Data
// is persisted in localStorage so the app can be used without a backend.

export class Lecture {
  // Retrieve all lectures. If an order is provided, such as '-created_date',
  // lectures are sorted accordingly.
  static async list(order) {
    const data = JSON.parse(localStorage.getItem('lectures') || '[]');
    if (order === '-created_date') {
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return data;
  }

  // Create a new lecture. Automatically assigns a unique ID based on the
  // current timestamp and pushes the lecture to localStorage.
  static async create(lecture) {
    const data = JSON.parse(localStorage.getItem('lectures') || '[]');
    const newLecture = { id: Date.now().toString(), ...lecture };
    data.push(newLecture);
    localStorage.setItem('lectures', JSON.stringify(data));
    return newLecture;
  }

  // In a more feature complete implementation you could add update and
  // delete methods here to manage existing lectures.
}

export default Lecture;
