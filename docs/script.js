const bee = document.getElementById('bug')
var last_x = 0
console.clear()

function moveBeeMobile(e){  
  var touch = e.touches[0];
  // get the DOM element
  var leaf = document.elementFromPoint(touch.clientX, touch.clientY);

  var bx = touch.clientX 
  var by = touch.clientY 

  bee.style.left = bx + 'px'
  bee.style.top = by + 'px'  

  if(last_x < bx) {
    bee.classList.add('flip')
  } else {
    bee.classList.remove('flip')
  }
  last_x = bx

  // add honeycomb trail
  var h = document.createElement('div')
  h.className = 'honey_trail'
  h.style.left = bx + 10 +'px'
  h.style.top = by + 30 + 'px' 

  //limit the spew of honeycomb
  if(Math.random() < .5) {
    document.body.appendChild(h)  

    //remove trail once faded
    setTimeout(function(){      
      document.getElementsByClassName('honey_trail')[0].remove()       
    },2500)
  }
}
window.addEventListener('touchmove', moveBeeMobile)

// function to move bee in conjunction with mouse
window.addEventListener('mousemove', function(e) {
  var x = e.clientX - 15
  var y = e.clientY - 15  
  bee.style.left = x +'px'
  bee.style.top = y + 'px'
  console.log(e.clientX - (window.innerWidth/2))
  if(last_x < x) {
    bee.classList.add('flip')    
  } else {
    bee.classList.remove('flip')    
  }  
  last_x = x
  
  // add honeycomb trail
  var h = document.createElement('div')
  h.className = 'honey_trail'
  h.style.left = x + 10 +'px'
  h.style.top = y + 30 + 'px' 

  //limit the spew of honeycomb
  if(Math.random() < .5) {
    document.body.appendChild(h)  

    //remove trail once faded
    setTimeout(function(){      
      document.getElementsByClassName('honey_trail')[0].remove()       
    },2500)
  }
})