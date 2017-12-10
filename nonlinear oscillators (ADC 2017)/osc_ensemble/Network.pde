
class Network {

   class InLink {
      int    from;
      float  weight;
      InLink( int from )                 { this( from, 1.0 );   }
      InLink( int from , float weight )  { this.from = from;  this.weight = weight; }
   }
   
   ArrayList<InLink>[]  node;

   Network( int N_node ) {
      node = new ArrayList[ N_node ];
      for ( int n = 0; n < node.length ; ++n )  node[n] = new ArrayList<InLink>();
   }

   void   add_link( int to, int from, float weight )  { node[to].add( new InLink(from,weight) ); }
   void   add_link( int to, int from )                { this.add_link( to, from, 1.0 ); }

   ArrayList<InLink>  get_in_links( int n )           { return node[n]; }

}
