//  (c) copyright André Bergner, Berlin 2016

function load_sample( player, context, url )
{
   var request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.responseType = 'arraybuffer';

   request.onload = function() {
      context.decodeAudioData( request.response, function(buffer) {
         player.buffer = buffer;
         player.start(0); 
      }, function(){ console.log("error loading file.") } );
   }
   request.send();
}


function make_processor( kernel, audio_context, buffer_size )
{
   var node = audio_context.createScriptProcessor
              (  buffer_size     || 0
              ,  kernel.num_ins  || 1
              ,  kernel.num_outs || 1
              );

   buffer_size = node.bufferSize;

   var block_process = function(p,N) {
      return function(e) {
         var input = e.inputBuffer.getChannelData(0);
         var output = e.outputBuffer.getChannelData(0);
         for ( var n = 0; n < N; ++n )
             output[n] = p(input[n])
      }
   };

   var block_process_oo = function(p,N) {
      return function(e) {
         var input = e.inputBuffer.getChannelData(0);
         var output_l = e.outputBuffer.getChannelData(0);
         var output_r = e.outputBuffer.getChannelData(1);
         for ( var n = 0; n < N; ++n )
         {
             var y = p(input[n])
             output_l[n] = y[0];
             output_r[n] = y[1];
         }
      }
   };

   var block_process_ooin_ooout = function(p,N) {
      return function(e) {
         var input_l = e.inputBuffer.getChannelData(0);
         var input_r = e.inputBuffer.getChannelData(1);
         var output_l = e.outputBuffer.getChannelData(0);
         var output_r = e.outputBuffer.getChannelData(1);
         for ( var n = 0; n < N; ++n )
         {
             var y = p(input_l[n], input_r[n])
             output_l[n] = y[0];
             output_r[n] = y[1];
         }
      }
   };

   if ( kernel.num_outs === 2 )
      if ( kernel.num_ins === 2 )
          node.onaudioprocess = block_process_ooin_ooout( kernel, node.bufferSize );
      else
          node.onaudioprocess = block_process_oo( kernel, node.bufferSize );
   else
      node.onaudioprocess = block_process( kernel, node.bufferSize );

   return node;
};



function connect_stereo_analyzer( node, fft_size )
{
   fft_size = fft_size || 2048;

   var context = node.context;

   var splitter = context.createChannelSplitter(2);
   node.connect( splitter );

   var analyzers = [];

   analyzers[0] = context.createAnalyser();
   analyzers[1] = context.createAnalyser();
   analyzers[0].fftSize = fft_size;
   analyzers[1].fftSize = fft_size;
   splitter.connect( analyzers[0] , 0 );
   splitter.connect( analyzers[1] , 1 );

   return analyzers;
}
