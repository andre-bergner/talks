import  ddf.minim.*;
import  ddf.minim.signals.*;


Minim        minim;
AudioOutput  dac;
OscEnsemble  oscen;

float last_mouse_x = 0;
float last_mouse_y = 0;

void setup () {

  size( 500 , 500 , P2D );

  minim = new Minim(this);

  dac = minim.getLineOut( Minim.STEREO , 1024 );
  oscen = new OscEnsemble();
  dac.addSignal( oscen );
}





void draw()
{
  background (  0  );
  stroke     ( 255 );

  // draw the waveforms
  for ( int n = 0; n < dac.bufferSize()-1; ++n ) {

    float x1 = map ( n , 0, dac.bufferSize(), 0, width);
    float x2 = map (n+1, 0, dac.bufferSize(), 0, width);
    line(x1, 50 + dac.left.get(n)*50, x2, 50 + dac.left.get(n+1)*50);
    line(x1, 150 + dac.right.get(n)*50, x2, 150 + dac.right.get(n+1)*50);
  }

  if (last_mouse_x != mouseX || last_mouse_y != mouseY)
  {
    last_mouse_x = mouseX;
    last_mouse_y = mouseY;
    println(mouseX, mouseY);
  }

  // Interesting corrdinates
  ellipse(347, 390, 5, 5);
  ellipse(19, 346, 5, 5);
  ellipse(43, 272, 5, 5);
  ellipse(56, 321, 5, 5);
  ellipse(7, 134, 5, 5);
  ellipse(194, 408, 5, 5);
  ellipse(122, 170, 5, 5);
  ellipse(398, 413, 5, 5);
}

void stop() {

  dac.close();
  minim.stop();
  super.stop();
}


