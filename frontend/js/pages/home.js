// home.js
// Página de inicio

/**
 * Renderiza la página de inicio
 * @param {HTMLElement} container
 */
export function renderHome(container) {
  container.innerHTML = `
    <section class="home-section">
      <div class="home-row">
        <div class="home-text">
          <h1>Bienvenidos a nuestra plataforma</h1>
          <p>
            Descubre una plataforma pensada para aprender, crear y generar oportunidades reales en el mundo del arte aplicado.
            Aquí encontrarás cursos diseñados paso a paso, enfocados en resultados concretos, especialmente en áreas como la sublimación, personalización de productos e impresión.<br><br>
            Aprende con contenidos prácticos, actualizados y orientados al mercado, ideales tanto si estás comenzando como si buscas perfeccionar tus habilidades y hacer crecer tu emprendimiento. Además, podrás acceder a productos, insumos y recursos clave para llevar tus ideas a la práctica de forma profesional.<br><br>
            No se trata solo de aprender, sino de transformar tu conocimiento en ingresos y proyectos reales. Empieza hoy y da el siguiente paso en tu desarrollo creativo.
          </p>
        </div>
        <div class="home-image">
          <img src="img/home/principal.png" alt="Arte aplicado" />
        </div>
      </div>
    </section>
  `;
}
