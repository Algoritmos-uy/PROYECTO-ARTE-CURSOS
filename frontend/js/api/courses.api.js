// courses.api.js
// API para obtener cursos desde el backend

/**
 * Obtiene el listado de cursos
 * @returns {Promise<Array>} Array de cursos
 */
export async function getCourses() {
	const response = await fetch('/api/courses');
	if (!response.ok) {
		throw new Error('Error al obtener cursos');
	}
	return await response.json();
}
