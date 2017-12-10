
class HighpassFilter
{
   float  p, y;

   HighpassFilter()
   {
      p = 0.03;
   }

   float process(float x)
   {
       y += p*(x-y);
       return x - y;
   }
}

