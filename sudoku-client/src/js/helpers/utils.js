const validation = (row, col) => {

  const leftBoxPos = parseInt(col / 3);
  const leftInputPos = col % 3;

  const topBoxPosition = parseInt(row / 3);
  const topInputPosition = row % 3;


  console.log("leftBoxPos: ", leftBoxPos, "leftInputPos: ", leftInputPos);
  console.log("topBoxPosition: ", topBoxPosition, "topInputPosition: ", topInputPosition);
 

};

export default {
  validation
};
