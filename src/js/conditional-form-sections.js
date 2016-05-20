'use strict';
$( function( ready ) {
  var sections = document.querySelectorAll( '.sq-form-section' );
  var radios = document.querySelectorAll( 'input[type="radio"]' );

  for ( var i = 0 ; i < sections.length ; i++ ) {
    var section = sections[i]
    var title = section.querySelector( '.sq-form-section-title' );
    console.log(title);
    if ( !title ) continue;
    var sectionTitle = title.innerHTML.match( /^#[0-9]*/ );
    var sectionID = sectionTitle && sectionTitle[0].slice( 1 );
    console.log(sectionID);
    if ( !sectionID ) continue;
    section.setAttribute( 'data-conditional-section', sectionID );
    title.innerHTML = title.innerHTML.replace(sectionTitle[0], '' );
  }

  for ( var i = 0 ; i < radios.length ; i++ ) {
    var radio = radios[i];
    var label = document.querySelector( '#' + radio.id + ' + label' );
    if ( !label ) continue;
    var labelTitle = label.innerHTML.match( /^\?[0-9]*/ );
    var sectionID = labelTitle && labelTitle[0].slice( 1 );
    if ( !sectionID ) continue;
    radio.setAttribute( 'data-conditional-input', sectionID );
    label.innerHTML = label.innerHTML.replace( labelTitle[0], '' );
  }

  $( 'form' ).change( function () {
    var hiddens = this.querySelectorAll( '[data-conditional-section]' );
    var showns = []
    var form_radios = this.querySelectorAll( '[data-conditional-input]' );
    for ( var i = 0 ; i < form_radios.length ; i++ ) {
      var form_radio  = form_radios[i];
      if ( !form_radio.checked ) continue;
      showns.push( form_radio );
    }
    for ( var i = 0 ; i < hiddens.length ; i++ ) {
      var hidden  = hiddens[i];
      if ( showns.indexOf( hidden ) > -1 ) {
        $(hidden).show();
      } else {
        $(hidden).hide();
      }
    }
  });
});
