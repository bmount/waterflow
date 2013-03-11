function placeholder () {}


function oldflood (px, w0, x0, y0, ov, nv, xf, yf, cp) {
  var stack = [[x0, y0]]
    , c, x, y;
  var maxes = [x0, y0];
  var mins = [x0, y0];
  while (stack.length) {
    c = stack.pop();
    x = c[0];
    y = c[1];
    if (px[(y*w0 + x)*4] != ov) { 
      continue;
    }
    else {
      px[(y*w0 + x)*4] = nv;
      if (cp) { 
        // Be a man use Cyan
        cp.data[((y-cp.yoff)*cp.w + x - cp.xoff)*4] = 0;
        // gray:
        //cp.data[((y-cp.yoff)*cp.w + x - cp.xoff)*4] = 126;
        //cp.data[((y-cp.yoff)*cp.w + x - cp.xoff)*4 + 1 ] = 126;
        //cp.data[((y-cp.yoff)*cp.w + x - cp.xoff)*4 + 2 ] = 126;
        //cp.data[((y-cp.yoff)*cp.w + x - cp.xoff)*4 + 3 ] = 200;
      }
      if (x > maxes[0]) { maxes[0]=x }
      if (y > maxes[1]) { maxes[1]=y }
      if (x < mins[0])  { mins[0]=x }
      if (y < mins[1])  { mins[1]=y }
      // check if overflowing into a 
      // white-edge area such that there is no
      // closed geometry for a block -- infrequent
      // so far
      //if (x <= 0) return false;
      //if (y <= 0) return false;
      //if (x >= xf) return false;
      //if (x >= yf) return false;
      stack.push([x, y-1]);
      stack.push([x, y+1]);
      stack.push([x+1, y]);
      stack.push([x-1, y]);
    }
  }
  return [mins, maxes]
}
