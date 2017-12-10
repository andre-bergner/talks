//  (c) copyright André Bergner, Berlin 2016

function require(lib)
{
   var importer = document.createElement('script');
   importer.type = 'text/javascript';
   importer.src = lib;
   document.head.appendChild(importer);
}

require( '../audio-js/audio_tools.js' )
require( '../audio-js/audio_visualization.js' )
require( '../audio-js/controls.js' )


var one_pole = function( cutoff )
{
   var y = 0.0;
   var a = cutoff || 0.9;
   var f = function( x ) {
      y = y + a*(x-y)
      return y;
   }
   f.set_freq = function(a_) { a = a_; }
   return f;
};


var moog_filter = function( freq, res )
{
   freq = freq || 0.1;
   res  = res  || 0.99;

   var fs = [ one_pole(freq), one_pole(freq), one_pole(freq), one_pole(freq) ];
   var y = 0;

   var f = function( x ) {
      y = fs[0](fs[1](fs[2](fs[3]( Math.tanh(x) - Math.tanh(4*res*y) ))));
      //y = Math.tanh(fs[0](Math.tanh(fs[1](Math.tanh(fs[2](Math.tanh(fs[3]( x - 4*res*y ))))))));
      return res*y;
   }

   f.set_freq = function(f) {
      fs[0].set_freq(f);
      fs[1].set_freq(f);
      fs[2].set_freq(f);
      fs[3].set_freq(f);
   }

   f.set_reso = function(r) {
      res = r;
   }

   return f;
}



var moog_pair = function( freq, res )
{
    freq = freq || 0.1;
    res  = res  || 0.99;

    var k = 0.1;
    var d = 0.1;
    var freq = 0.1;

    var fs = [ moog_filter(freq,res), moog_filter(freq,res) ];
    var y  = [ 0 , 0 ];

    var f = function( x ) {
        //y[0] = fs[0]( x + Math.tanh(k*(y[1]-y[0])) /* + ? * x[1]*/ )
        //y[1] = fs[1]( x + Math.tanh(k*(y[0]-y[1])) /* + ? * x[1]*/ )
        y[0] = fs[0]( x + k*(y[1]-y[0]) )
        y[1] = fs[1]( x + k*(y[0]-y[1]) )
        //return y[0] + y[1]
        return [ y[0] , y[1] ]
    }

    f.set_freq = function(x) {
        freq = x;
        fs[0].set_freq( freq );
        fs[1].set_freq( freq * d );
    }

    f.set_reso = function(r) {
        fs[0].set_reso(r);
        fs[1].set_reso(r);
    }

    f.set_detune   = function(x) { d = x; f.set_freq(freq); }
    f.set_coupling = function(x) { k = x; }

    f.num_outs = 2;

    return f;
}




var downmixer = function( freq, res )
{
    var f = function(l , r) {
        return [ l+r , l+r ]
    }

    f.num_ins = 2;
    f.num_outs = 2;

    return f;
}




function main()
{
   var context = new AudioContext();

   var master_gain = context.createGain();
   master_gain.gain.value = 0.9;
   master_gain.connect( context.destination );

   var reso = moog_pair();
   var filter = make_processor( reso, context );

   var downmixer_p = make_processor( downmixer(), context );

   //filter.connect( master_gain )
   filter.connect( downmixer_p )
   downmixer_p.connect( master_gain )

   analyzers = connect_stereo_analyzer( filter );

   var fft = new Float32Array( analyzers[0].frequencyBinCount )
   var pcm = new Uint8Array( analyzers[0].frequencyBinCount );
   var pcm2 = new Uint8Array( analyzers[1].frequencyBinCount );


   var player = context.createBufferSource();
   player.loop = true;
   player.connect( filter );
   load_sample(player,context,"amen.wav");
   //load_sample("http://localhost:8000/simple_looper/amen.wav");


   function set( setter, value ) { setter(value); return value; }

   function update_cutoff( value )   { return set( reso.set_freq, Math.exp(5*(value-1.0)) ); }
   function update_reso( value )     { return set( reso.set_reso, 2.*value ); }
   function update_detune( value )   { return set( reso.set_detune, Math.exp(4*(value-0.5)) ); }
   function update_coupling( value ) { return set( reso.set_coupling, 4.*value ); }
   function update_speed( value )    { return player.playbackRate.value = Math.exp(value-0.5); }
   function player_stop( value )     { player.playbackRate.value = 0; }


   var add_sliders = function()
   {
      var controls = document.getElementById('controls')

      controls.appendChild( make_slider( "cutoff",    update_cutoff,   0.3 ));
      controls.appendChild( make_slider( "resonance", update_reso,     0.2 ));
      controls.appendChild( make_slider( "detune",    update_detune,   0.5 ));
      controls.appendChild( make_slider( "coupling",  update_coupling, 0.01 ));
      controls.appendChild( make_slider( "speed",     update_speed,    0.4 ));
      controls.appendChild( make_button( "stop",    player_stop ));
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
