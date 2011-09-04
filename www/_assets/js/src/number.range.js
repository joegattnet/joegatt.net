NB.Number.range = function (number, min, max) {
  return this<min?min:(number> max?max:number);
}
