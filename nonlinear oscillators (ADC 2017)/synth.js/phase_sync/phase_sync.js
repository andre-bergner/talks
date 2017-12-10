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




var duffing_generator = function( ω1, ω2, κ )
{
   ω1 = ω1 || 1.
   ω2 = ω2 || 1.2
   κ  = κ  || 0.

   var sin = function(x) { return Math.sin(x); }

   var ode = function( x , t )
   {
      return [  ω1 + κ*sin( x[1] - x[0] )
             ,  ω2 + κ*sin( x[0] - x[1] )
             ];
   }


   var φ   = [ 1, 0 ];
   var t   = 0.0;
   var dt  = 0.01;

   var stepper = function()
   {
      φ = odeint.runge_kutta_4( ode, φ, t, dt );
      t += dt;
      return [ sin(φ[0]) , sin(φ[1]) ]
   }

   stepper.set_ω1  = function(v) { ω1 = v; };
   stepper.set_ω2  = function(v) { ω2 = v; };
   stepper.set_κ   = function(v) { κ = v;  };

   stepper.num_outs = 2;

   return stepper;
}





function main()
{
   var context = new AudioContext();

   var master_gain = context.createGain();
   master_gain.gain.value = 0.5;
   master_gain.connect( context.destination );

   var gen = duffing_generator( )
   var synth = make_processor( gen, context );
   synth.connect( master_gain );

   analyzers = connect_stereo_analyzer( synth );

   var fft = new Float32Array( analyzers[0].frequencyBinCount )
   var pcm = new Uint8Array( analyzers[0].frequencyBinCount );
   var pcm2 = new Uint8Array( analyzers[1].frequencyBinCount );



   function set( setter, value ) { setter(value); return value; }

   function update_ω1( value )  { return set( gen.set_ω1, 1+30*value ); }
   function update_ω2( value )  { return set( gen.set_ω2, 1+30*value ); }
   function update_κ( value )   { return set( gen.set_κ,  5*value ); }

   var add_sliders = function()
   {
      var controls = document.getElementById('controls')

      controls.appendChild( make_slider( "ω1", update_ω1 , 0.5  ) );
      controls.appendChild( make_slider( "ω2", update_ω2 , 0.55 ) );
      controls.appendChild( make_slider( "κ", update_κ   ,  0.001   ) );
   }

   add_sliders();

   function scale( xs , a ) { for ( var n = 0 ; n < xs.length; ++n ) { xs[n] *= a; } }

   draw_oscilloscope
   (  function(){
         analyzers[0].getFloatFrequencyData(fft);
         scale( fft , -1 );
         return fft;
      }
   ,  { x: 0, y: 0, width: 400, height: 400 }
   );

   draw_xy_oscilloscope
   (  function(){ analyzers[0].getByteTimeDomainData(pcm);   scale( pcm, .8 ); return pcm; }
   ,  function(){ analyzers[1].getByteTimeDomainData(pcm2); scale( pcm2, .8 ); return pcm2; }
   ,  { x: 420, y: 0, width: 400, height: 400 }
   );
}

