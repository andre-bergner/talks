//  (c) copyright André Bergner, Berlin 2016

var draw_oscilloscope = function( data_source , rect )
{
    rect = rect ||
    {   x      : 0
    ,   y      : 0
    ,   width  : 500
    ,   height : 300
    }

    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.fillStyle = 'rgb(200, 200, 200)';

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';

    var draw = function()
    {
        requestAnimationFrame( draw );

        pcm = data_source();

        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.beginPath();

        var sliceWidth = rect.width * 1.0 / pcm.length;
        var x = 0;

        var pcm2pix = function(x) { return x / 128.0 * rect.height/2; };
        ctx.moveTo( x, pcm2pix(pcm[0]) );
        pcm.slice(1).forEach( function(y)
        {
            ctx.lineTo( x, pcm2pix(y) );
            x += sliceWidth;
        });

        ctx.stroke();
    }

    draw();
}




var draw_xy_oscilloscope = function( data_source1 , data_source2 , rect )
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

    var draw = function()
    {
        requestAnimationFrame( draw );

        pcm1 = data_source1();
        pcm2 = data_source2();

        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.beginPath();

        var pcm2pix = function(x) { return x / 128.0 * rect.height/2; };

        ctx.moveTo( rect.x + pcm2pix(pcm1[0]), rect.y + pcm2pix(pcm2[0]) );
        for ( var n = 1 ; n < pcm1.length ; ++n )
        {
            ctx.lineTo( rect.x + pcm2pix(pcm1[n]), rect.y + pcm2pix(pcm2[n]) );
        }

        ctx.stroke();
    }

    draw();
}
