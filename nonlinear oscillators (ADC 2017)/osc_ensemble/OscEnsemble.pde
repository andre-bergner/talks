
class OscEnsemble implements AudioSignal
{
  // TODO:
  // - iterate through net and us coupling-function
  // - implement array-add helper function
  
   Network         net;
   StuartLandau[]  osc;
   HighpassFilter  hipass_l, hipass_r;
   float[][]       u;
//   Integrator      integrator;
   float           dt;
   float           norm_;
   int             N_nodes = 25;

   OscEnsemble() {
      net = new Network(N_nodes);
      osc = new StuartLandau[N_nodes];
      u = new float[N_nodes][2];
      hipass_l = new HighpassFilter();
      hipass_r = new HighpassFilter();


      for ( int n = 0 ; n < osc.length ; ++n )
        osc[n] = new StuartLandau( -1. + 0.0003*n , 4.0, -1.0);


      //  build star net
      for ( int n = 1 ; n < osc.length ; ++n ) {
         net.add_link( n , 0 , 2.  );
         net.add_link( 0 , n , 2. / float(osc.length-1) );
      }
      osc[0].w = -4.;
//      osc[0].a = -.1;

/*
      for ( int n = 0 ; n < osc.length ; n+=2 ) {
         osc[n].w *= 2.0;
         for ( int m = 1 ; m < osc.length ; m+=2 ) {
            net.add_link( n , m , 5.  );
            net.add_link( m , n , 5.  );
         }
      }
*/
      for ( int n = 0 ; n < u.length ; ++n )   u[n] = new float[] { 1. , 0. };

      dt = 0.01;
      norm_ = 1. / (float)u.length   * 2.0;
   }

   void generate( float[] sig ) 
   {}


   void generate ( float[] lsig , float[] rsig )  {
  
      for ( int n = 0; n < lsig.length; ++n ) {
         propagate();
         for ( float[] u_ : u ) {
            lsig[n] += u_[0];
            rsig[n] += u_[1];
         }         
         lsig[n] *= norm_;
         rsig[n] *= norm_;
         lsig[n] = hipass_l.process(lsig[n]);
         rsig[n] = hipass_r.process(rsig[n]);
      }
   }


   //////////////////////////////////////////
   //  define the propagator for ease uf use
   //
   void  propagate() {
      float
        k1 = mouseX/500.,
        k2 = (mouseY-250.)/500.;

      for ( int n = 0 ; n < u.length ; ++n ) {
         float[] der = osc[n].derivative(u[n]);
         for ( Network.InLink l : net.get_in_links(n) ) {
            float[]  cpl = osc[n].coupling( u[n] , u[l.from] , new float[] {l.weight*k1,l.weight*k2});
            for ( int d = 0 ; d < der.length ; ++d )  der[d] += cpl[d];
         }
         for ( int m = 0 ; m < u[n].length ; ++m )
            u[n][m]  +=  dt * der[m];
      }
  }


}


