//  (c) copyright André Bergner, Berlin 2016

var odeint = (function()
{
   // precondition: v1.length == v2.length

   var add = function( v1 , v2 )
   {
      if ( ! Array.isArray(v1) ) return v1 + v2;

      var v3 = [];

      var n = v1.length;
      while (n--) v3[n] = add( v1[n] , v2[n] );

      return v3;

   }

   // precondition: v1.length == v2.length

   var add_scale = function( v1 , v2 , a )
   {
      if ( ! Array.isArray(v1) ) return v1 + a*v2;

      var v3 = [];

      var n = v1.length;
      while (n--) v3[n] = add_scale( v1[n] , v2[n] , a );

      return v3;
   }



   var runge_kutta_4 = function( system , x , t , dt )
   {
      var dt2  =  0.5 * dt

      k1 = system( x                      , t       );
      k2 = system( add_scale(x, k1, dt2 ) , t + dt2 );
      k3 = system( add_scale(x, k2, dt2 ) , t + dt2 );
      k4 = system( add_scale(x, k3, dt  ) , t + dt  );

      // return  x + ( k1 + 2*(k2 + k3) + k4 ) * dt / 6.;
      return  add_scale( x
                       , add( add_scale(k1 , add(k2,k3), 2) , k4 )
                       , dt / 6.
                       );
   }


   var integrate_const = function( stepper, system, state, t_begin, t_end, dt )
   {
      states = [];
      for ( var t = t_begin ; t <= t_end ; t += dt )
         states.push( state = stepper( system, state, t, dt ) );
      return states;
   }

   return { runge_kutta_4   : runge_kutta_4
          , integrate_const : integrate_const
          , add : add
          }

})();


