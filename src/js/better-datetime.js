( function () {
  var sections = document.querySelectorAll( '.sq-form-question-datetime' );

  for ( var i = 0 ; i < sections.length ; ++i ) {
    var section = sections[i];
    var labels = section.querySelectorAll( 'label' );
    var selects = section.querySelectorAll( '.styled-select' );
    console.log(labels,selects);
    var labelWidth = ( 1.0 / labels.length * 100.0 );
    var selectWidth = ( 1.0 / labels.length * 100.0 - 1 );

    for ( var j = 0 ; j < labels.length ; ++j ) {
      console.log(j);
      var label = labels[j];
      label.style.width = labelWidth.toString() + '%';
    }

    for ( var k = 0 ; k < selects.length ; ++k ) {
      console.log(k);
      var select = selects[k];
      select.style.width = selectWidth.toString() + '%';
    }

  }
})();
