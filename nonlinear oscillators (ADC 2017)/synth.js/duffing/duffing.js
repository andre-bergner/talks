// Encoding: UTF-8
//  (c) copyright André Bergner, Berlin 2016

function require(lib)
{
   var importer = document.createElement('script');
   importer.type = 'text/javascript';
   importer.src = lib;
   document.head.appendChild(importer);
}

require( '../odeint-js/odeint.js' )
require( '../audio-js/audio_tools.js' )
require( '../audio-js/audio_visualization.js' )
require( '../audio-js/controls.js' )



/*
var lorenz_generator = function( sigma, rho, beta )
{
   sigma = sigma || 10.
   rho   = rho   || 28.
   beta  = beta  || 2.

   var lorenz_sys = function( x , t )
   {
      return [  sigma * ( x[1] - x[0] )
             ,  x[0] * ( rho - x[2] ) - x[1]
             ,  x[0] * x[1]  -  beta * x[2]
             ];
   }


   var state   = [ 1, 1, 0 ];
   var t       = 0.0;
   var dt      = 0.01;

   var stepper = function()
   {
      state = odeint.runge_kutta_4( lorenz_sys, state, t, dt );
      t += dt;
      return 0.2 * state[1];
   }

   stepper.set_sigma = function(v) { sigma = v; };
   stepper.set_rho   = function(v) { rho = v;   };
   stepper.set_beta  = function(v) { beta = v;  };

   return stepper;
}
*/


var duffing_generator = function( ω, ω0, γ, β )
{
   ω  = ω   || 1.
   ω0 = ω0  || 1.
   γ  = γ   || 0.4
   β  = β   || 0.

   var ode = function( x , t )
   {
      return [  x[1]
             ,  -γ * x[1] - ω0 * x[0] + β * x[0]*x[0]*x[0] - Math.cos(ω*x[2])
             ,  1.0
             ];
   }


   var state   = [ 1, 0, 0 ];
   var t       = 0.0;
   var dt      = 0.01;

   var stepper = function()
   {
      state = odeint.runge_kutta_4( ode, state, t, dt );
      t += dt;
      return state[1];
   }

   stepper.set_ω  = function(v) { ω = v; };
   stepper.set_ω0 = function(v) { ω0 = v; };
   stepper.set_γ  = function(v) { γ = v;   };
   stepper.set_β  = function(v) { β = v;  };

   return stepper;
}




function main()
{
   var context = new AudioContext();

   var master_gain = context.createGain();
   master_gain.gain.value = 0.2;
   master_gain.connect( context.destination );


   var gen = duffing_generator( )
   var synth = make_processor( gen, context );
   synth.connect( master_gain );


   var splitter = context.createChannelSplitter(2);
   synth.connect( splitter )

   var analyzer = context.createAnalyser();
   analyzer.fftSize = 2048;
   splitter.connect( analyzer , 0 );

   var fft = new Float32Array( analyzer.frequencyBinCount )


   function set( setter, value ) { setter(value); return value; }

   function update_ω( value )   { return set( gen.set_ω, 1+30*value ); }
   function update_ω0( value )  { return set( gen.set_ω0, 1+30*value ); }
   function update_γ( value )   { return set( gen.set_γ, value ); }
   function update_β( value )   { return set( gen.set_β, -5 + 10*value ); }

   var add_sliders = function()
   {
      var controls = document.getElementById('controls')

      controls.appendChild( make_slider( "ω"  , update_ω   , 0.1 ));
      controls.appendChild( make_slider( "ω0" , update_ω0  , 0.5 ));
      controls.appendChild( make_slider( "γ"  , update_γ   , 0.1 ));
      controls.appendChild( make_slider( "β"  , update_β   , 0.8 ));
   }

   add_sliders();


   function scale( xs , a ) { for ( var n = 0 ; n < xs.length; ++n ) { xs[n] *= a; } }

   draw_oscilloscope
   (  function(){
         analyzer.getFloatFrequencyData(fft);
         scale( fft , -1 );
         return fft;
      }
   ,  { x: 0, y: 0, width: 400, height: 400 }
   );


   /*
   function draw_amplitude_response( rect )
   {
      rect = rect ||
      {   x      : 0
      ,   y      : 0
      ,   width  : 300
      ,   height : 300
      }

      var ctx = document.getElementById('canvas').getContext('2d');

      ctx.fillStyle = 'rgb(200, 200, 200)';

      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000';

      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.beginPath();

      var zeta = 0.1;
      var β = 2.;
      var sqr = function(x) { return x*x; }

      var x = 0;
      var f = function(x) { return 1.0 / Math.sqrt( sqr(zeta) + sqr(x) ); }

      ctx.moveTo( rect.x + x, rect.y + f(x) );
      for ( var n = 1 ; n < rect.width ; ++n )
      {
         x = n;
         ctx.lineTo( rect.x + x, rect.y + f(x) );
      }

      ctx.stroke();
   }

   draw_amplitude_response({ x: 420, y: 0, width: 400, height: 400 });
   */
}

