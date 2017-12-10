
class Integrator {

   float            dt;
 
   Integrator()              { this( 0.01 ); }
   Integrator( float dt )    { this.dt = dt; }

   // Euler step
   void step( float[] state , DynamicalSystem  sys ) {
      float[] deriv  = sys.derivative( state );
      for ( int n = 0; n < state.length ; ++n )
         state[n]  +=  dt * deriv[n];
   }

}

