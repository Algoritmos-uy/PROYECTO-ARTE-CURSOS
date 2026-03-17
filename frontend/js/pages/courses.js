// courses.js
// Página de cursos: obtiene y renderiza cursos

import { renderCourses } from '../render/renderCourses.js';
import { getCourses } from '../api/courses.api.js';

/**
 * Renderiza la sección de cursos
 * @param {HTMLElement} container
 */

export async function renderCoursesPage(container) {
  const courses = await getCourses();
  renderCourses(container, courses);
}

// Inicialización automática si existe el contenedor
document.addEventListener('DOMContentLoaded', () => {
  const coursesContainer = document.getElementById('courses-container');
  if (coursesContainer) {
    renderCoursesPage(coursesContainer);
  }
});
