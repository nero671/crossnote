// Helped class for Task
export default class Task {
  constructor(
    title,
    description,
    completed,
    editing,
    user = null,
    id = null
  ) {
    this.title = title
    this.description = description
    this.completed = completed
    this.editing = editing
    this.user = user
    this.id = id
  }
}
