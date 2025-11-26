const items = document.querySelectorAll('.item');
const dialog = document.getElementById('dialog');
let hideTimer; // Variable para almacenar el temporizador de ocultamiento

items.forEach(item => {
    // 1. Mostrar diálogo (Eliminar cualquier temporizador de ocultamiento)
    item.addEventListener('mouseover', () => {
        clearTimeout(hideTimer); // Detiene cualquier intento de ocultar el diálogo
        const content = item.getAttribute('data-content');
        showDialog(content, item);
    });

    // 2. Ocultar diálogo (Iniciar temporizador)
    item.addEventListener('mouseleave', () => {
        // Establece un retraso de 150ms para ocultar el diálogo
        hideTimer = setTimeout(() => {
            dialog.style.display = 'none';
        }, 150); 
    });
});

// --- Manejo de Eventos del Diálogo (#dialog) ---

// 3. Si el puntero entra en el diálogo, cancelamos el ocultamiento
dialog.addEventListener('mouseover', () => {
    clearTimeout(hideTimer); 
});

// 4. Si el puntero sale del diálogo, iniciamos el ocultamiento (necesario si el ratón sale del diálogo directamente)
dialog.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => {
        dialog.style.display = 'none';
    }, 150);
});


/**
 * Muestra el diálogo posicionado al lateral del elemento.
 * (El cuerpo de esta función se mantiene sin cambios, solo se incluye para la completitud)
 */
function showDialog(content, item) {
    dialog.innerText = content;
    
    dialog.style.display = 'block';
    dialog.style.top = '';
    dialog.style.left = '';

    const itemRect = item.getBoundingClientRect();
    const dialogWidth = dialog.offsetWidth;
    const dialogHeight = dialog.offsetHeight;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const margin = 10; 

    // --- CÁLCULO INICIAL (Derecha del Elemento) ---
    let left = itemRect.right + margin;
    let top = itemRect.top + (itemRect.height / 2) - (dialogHeight / 2); 
    
    // --- VERIFICACIÓN DE LÍMITES ---
    
    // Si se sale por la DERECHA, intentar IZQUIERDA
    if (left + dialogWidth > windowWidth - margin) {
        left = itemRect.left - dialogWidth - margin;
        
        // Si no cabe en la IZQUIERDA, ajustamos
        if (left < margin) {
            left = windowWidth - dialogWidth - margin;
        }
    }
    
    // Si se sale por la IZQUIERDA, ajustar
    if (left < margin) {
        left = margin;
    }

    // Ajustar TOP (Arriba y Abajo)
    if (top < margin) {
        top = margin; 
    } else if (top + dialogHeight > windowHeight - margin) {
        top = windowHeight - dialogHeight - margin; 
    }

    // --- APLICAR POSICIÓN ---
    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
}