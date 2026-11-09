# Portfolio de Sebastián Martínez Cortés

Portfolio estático con ilustración interactiva, seguimiento del cursor con los ojos, transiciones entre secciones, galería de proyectos y modo claro/oscuro.

## Subir a GitHub

1. Descomprime el ZIP en tu ordenador.
2. En GitHub, crea un repositorio llamado portfolio-sebastian.
3. Abre el repositorio y pulsa Add file → Upload files. En un repositorio vacío también puedes pulsar uploading an existing file.
4. Arrastra TODOS los archivos y la carpeta assets desde el interior de esta carpeta. index.html debe aparecer directamente en la raíz del repositorio.
5. Escribe un mensaje como Publicar portfolio y confirma la subida con Commit changes.

La estructura en GitHub debe contener index.html, style.css, main.js, README.md y assets/ al mismo nivel.

## Publicar con GitHub Pages

1. Para utilizar GitHub Pages con GitHub Free, usa un repositorio público.
2. En el repositorio abre Settings → Pages.
3. En Source elige Deploy from a branch.
4. Selecciona la rama main y la carpeta /(root). Pulsa Save.
5. Cuando termine la publicación, GitHub mostrará el enlace en esa misma pantalla.

## Editar el contenido

- index.html contiene la presentación, experiencia, servicios y contacto.
- main.js contiene la lista de proyectos y las interacciones.
- style.css contiene los estilos y las animaciones.
- assets/ contiene el avatar, las portadas y las fuentes.
- assets/kanit-OFL.txt contiene la licencia de la tipografía Kanit.

Para verlo con un servidor local, ejecuta desde esta carpeta:

    python -m http.server 8000

Después abre http://localhost:8000 en el navegador.

## Documentación

- Subir archivos a un repositorio: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Configurar GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Fuentes consultadas el 9 de noviembre de 2026.
