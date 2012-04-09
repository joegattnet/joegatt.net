function onEndCrop( coords, dimensions ) {
  $('cropX').value = coords.x1;
  $('cropY').value = coords.y1;
  $('cropWidth').value = dimensions.width;
  $('cropHeight').value = dimensions.height;
}

//Event.observe(window, 'load', function() { new Cropper.Img('cropImage',{onEndCrop:onEndCrop}) });
//NB//
Event.observe(window, 'load', function() { new Cropper.Img('cropImage',{onEndCrop:onEndCrop,ratioDim:{x:aspectWidth,y:aspectHeight}}) });
