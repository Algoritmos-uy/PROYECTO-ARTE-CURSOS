// renderCourses.js
// Renderiza cursos en el contenedor usando courseCard

import { courseCard } from '../components/courseCard.js';

/**
 * Renderiza un array de cursos en el contenedor
 * @param {HTMLElement} container
 * @param {Array} courses
 */
export function renderCourses(container, courses) {
  container.innerHTML = courses.map(courseCard).join('');
}
