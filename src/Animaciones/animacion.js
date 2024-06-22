const animacion = (elemento) => {
  const numeroLetras = elemento.dataset.texto.length;
  for (let i = 0; i < numeroLetras; i++) {
    setTimeout(() => {
      const letra = document.createElement("span");
      letra.append(elemento.dataset.texto[i]);
      elemento.append(letra);
    }, 300 * i);
  }
};

export default animacion;
