NB.String.increment = function(e){
  e.text(NB.Number.commas((NB.String.uncomma(e.text())+1)));
  return e;
}
