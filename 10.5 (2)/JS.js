const btnNode = document.querySelector('.btn');

btnNode.addEventListener('click', () => { 
  alert(`Ширина экрана: ${window.screen.width}, высота: ${window.screen.height}`);
})
