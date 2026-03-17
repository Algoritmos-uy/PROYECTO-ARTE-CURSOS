// courseCard.js
// Componente reutilizable para mostrar un curso

/**
 * Genera el HTML de una tarjeta de curso
 * @param {Object} course
 * @returns {string} HTML
 */
export function courseCard(course) {
  return `
    <div class="course-card">
      <img src="${course.image || 'img/default-course.png'}" alt="${course.title}" class="course-card-img">
      <div class="course-card-body">
        <h4 class="course-card-title">${course.title}</h4>
        <p class="course-card-desc">${course.description || ''}</p>
        <span class="course-card-price">$${course.price}</span>
      </div>
    </div>
  `;
}
