 // ********************
    // The design to render.
    // ********************
    const {
      booleans,
      primitives,
      extrusions,
      hulls,
      text,
      transforms,
      maths,
      geometries,
      measurements
    } = require('@jscad/modeling')

    const {
      union, subtract, intersect, scission
    } = booleans
    const {
      extrudeLinear
    } = extrusions
    const {
      hullChain
    } = hulls
    const {
      circle,
      sphere
    } = primitives
    const {
      vectorText
    } = text
    const {
      translate,
      scale,
      rotate
    } = transforms

    const {
      measureAggregateBoundingBox,
      measureBoundingBox,
      measureCenter
    } = measurements;

const { loadFontFromData, textToPaths } = require('../../dist/src/index.js')

const fs = require('fs')

// geometry or points array
const isCCW = (geometry) => {
  let area = 0; let j
  const points = geometry.points || geometry
  const length = points.length
  points.forEach((v, i) => {
    j = (i + 1) % length
    area += v[0] * points[j][1]
    area -= points[j][0] * v[1]
  })

  return area >= 0
}

    const toSides = (out, points)=>{
      let length = points.length
      let prevpoint = points[length - 1]
      for (let i = 0; i < length; i++) {
        const point = points[i]
        out.push([prevpoint, point])
        prevpoint = point
      }      
      return out
    }

    const toSidesInv = (out, points)=>{
      let length = points.length
      let prevpoint = points[0]
      for (let i = length - 1; i >= 0; i--) {
        const point = points[i]
        out.push([prevpoint, point])
        prevpoint = point
      }
      return out
    }

    function genText(options, text) {
      let paths = textToPaths(options, text)
      let areas = [] // areas must be each a geom, su union can be made for overlaps
      const holes = [] // we can put holes in a single geometry

      paths.forEach(path => {
        let {
          points,
          transforms
        } = path
        let length = points.length
        if (transforms) points = points.map(p => maths.vec2.transform([0, 0], p, transforms))
        if(isCCW(points)){
          toSides(holes, points)
        }else{
          areas.push(geometries.geom2.create(toSidesInv([], points)))
        }
      })

    return extrudeLinear({
        height: 500
      }, subtract(union(areas), geometries.geom2.create(holes) ))
    }


const main = (params) => {
  const data = fs.readFileSync('newproject/Habana.ttf') // CHANGE THIS TO THE FONT FILE NAME

  const font = loadFontFromData(data)

  let richardModel = rotate([(Math.PI * 2 / 4),0,0], translate([0,0,0], genText({ font:font, fontSize: 300 }, 'Alayah♥')));
  let beattieModel = rotate([(Math.PI * 2 / 4),0,(Math.PI * 2 / 4)], translate([-500,0,0], genText({ font:font, fontSize: 300 }, 'Richard')));

  let intersection = intersect(richardModel, beattieModel)

  const totalBounds = measureAggregateBoundingBox(intersection);

  console.log({totalBounds})

  let pieces = scission(intersection);

  // Sort pieces left to right, bottom to top
  pieces.sort((a, b) => {
    const aCenter = measureCenter(a);
    const bCenter = measureCenter(b);

    if (Math.abs(aCenter[1] - bCenter[1]) > 30) {
      return aCenter[1] - bCenter[1];
    }

    return aCenter[0] - bCenter[0];
  });

  let increment = (Math.sqrt(pieces.length)) + 1;

  console.log({increment})
  
  // Filter pieces by index along diagonal 0, 8, 16, 24, etc.
  // pieces = pieces.filter((piece, index) => {
  //   return index % increment === 0;
  // });
  

  return pieces;

  // // extrude
  // return extrusions.extrudeLinear({ height: 1 }, fixed)

  // const extruded = extrusions.extrudeLinear({height: 10}, paths)

  // return extruded
}

console.log(main())
