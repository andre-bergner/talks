//  (c) copyright André Bergner, Berlin 2016

var make_slider = function( name, set_value, default_pos )
{
   default_pos = default_pos || 0.5

   var label = document.createElement('label');
   label.innerHTML         = name;
   label.style.display     = "inline-block";
   label.style.width       = "150px";
   label.style.paddingRight = "10px";
   label.style.textAlign   = "right";
   label.style.fontFamily  = "Courier";

   var value = document.createElement('label');
   //value.innerHTML         = slider.value;
   value.style.display     = "inline-block";
   value.style.width       = "50px";
   value.style.paddingLeft = "10px";
   value.style.textAlign   = "left";
   value.style.fontFamily  = "Courier";

   var slider = document.createElement('input');
   slider.id = name;
   slider.type = "range";
   slider.min   = 0;
   slider.max   = 200;
   slider.value = default_pos * slider.max;
   slider.style.width = "200px";
   slider.oninput  = function(){ value.innerHTML = set_value( this.value / 200. ); }
   slider.onchange = function(){ value.innerHTML = set_value( this.value / 200. ); }

   slider.oninput( slider.value );

   var slider_container = document.createElement('div');
   slider_container.appendChild(label);
   slider_container.appendChild(slider);
   slider_container.appendChild(value);

   return slider_container;
}


var make_button = function( name, on_pushed )
{
   var button = document.createElement('button');
   button.innerHTML = name;
   button.onclick = on_pushed;

   return button;
}