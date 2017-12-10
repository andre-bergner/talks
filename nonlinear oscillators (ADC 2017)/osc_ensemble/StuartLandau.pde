//class State



interface DynamicalSystem {

   float[] derivative (
      float[] state
   );

   float[] coupling (
      float[]  x,    // the state coupled to
      float[]  y,    // the state coupled from
      float[]  k     // the complex coupling coefficient
   );

}



class StuartLandau implements DynamicalSystem {
  
   float   a,    // bifurcation/decay parameter
           b,    // nonlinear dispersion parameter
           w;    // eigenfrequency

   StuartLandau ( float  w )                    { this ( w, 1.0 );      }
   StuartLandau ( float  w, float  a )          { this ( w,   a, 0.0 ); }
   StuartLandau ( float  w, float  a, float b ) {
      this.w  =  w;
      this.a  =  a;
      this.b  =  b;
   }


   float[] derivative ( float[]  s ) {

      float   r  =  s[0] * s[0]  +  s[1] * s[1];
      return  new float[] {
         a * s[0]  -  w * s[1]  -    r * (   s[0] - s[1]*b ),
         w * s[0]  +  a * s[1]  -  r*r * ( b*s[0] + s[1]   )
      };

   }

   float[] coupling (
      float[]  x,    // the state coupled to
      float[]  y,    // the state coupled from
      float[]  k     // the complex coupling coefficient
   ){
//      float   ry  =  y[0] * y[0]  +  y[1] * y[1];
//      float[] dyx = { (1.+0.4*ry)*y[0] , (1.+0.4*ry)*y[1]};
//      float[] dyx = { y[0] - x[0] , y[1] - x[1] };
      float[] dyx = { y[0] , y[1]};
      return new float[] {
         k[0] * dyx[0] - k[1] * dyx[1],
         k[1] * dyx[0] + k[0] * dyx[1]
      };
   }

};

