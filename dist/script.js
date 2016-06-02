( function () {
  var sections = document.querySelectorAll( '.sq-form-section' );
  var radios = document.querySelectorAll( 'input[type="radio"]' );

  for ( var i = 0 ; i < sections.length ; ++i ) {
    var section = sections[i];
    var title = section.querySelector( '.sq-form-section-title' );
    if ( !title ) continue;
    var sectionTitle = title.innerHTML.match( /^#[0-9]*/ );
    var sectionID = sectionTitle && sectionTitle[0].slice( 1 );
    if ( !sectionID ) continue;
    section.setAttribute( 'data-conditional-section', sectionID );
    title.innerHTML = title.innerHTML.replace(sectionTitle[0], '' );
  }

  for ( var j = 0 ; j < radios.length ; ++j ) {
    var radio = radios[j];
    if (radio.addEventListener) {
      radio.addEventListener('change', formChange, false);
    } else if (radio.attachEvent)  {
      radio.attachEvent('onchange', formChange);
    }
    var label = document.querySelector( '#' + radio.id + ' + label' );
    if ( !label ) continue;
    var labelTitle = label.innerHTML.match( /^\?[0-9]*/ );
    var radioSectionID = labelTitle && labelTitle[0].slice( 1 );
    if ( !radioSectionID ) continue;
    radio.setAttribute( 'data-conditional-input', radioSectionID );
    label.innerHTML = label.innerHTML.replace( labelTitle[0], '' );
    hideConditionalSections( getForm( radio ) );
  }

  function formChange () {
    var form = getForm( this );
    var hiddens = form.querySelectorAll( '[data-conditional-section]' );
    var showns = [];
    var form_radios = form.querySelectorAll( '[data-conditional-input]' );
    for ( var i = 0 ; i < form_radios.length ; ++i ) {
      var form_radio  = form_radios[i];
      if ( !form_radio.checked ) continue;
      var shownId = form_radio.getAttribute( 'data-conditional-input' );
      if ( !shownId ) continue;
      var shownSection = form.querySelector( '[data-conditional-section="' + shownId + '"]' );
      if ( !shownSection ) continue;
      showns.push( shownSection );
    }
    for ( var j = 0 ; j < hiddens.length ; ++j ) {
      var hidden  = hiddens[j];
      if ( showns.indexOf( hidden ) > -1 ) {
        showSection( hidden );
      } else {
        hideSection( hidden );
      }
    }
  }

  function hideConditionalSections ( form ) {
    var hiddens = form.querySelectorAll( '[data-conditional-section]' );
    for ( var i = 0 ; i < hiddens.length ; ++i ) { hiddens[i].style.display = 'none'; }
  }

  function getForm ( el ) {
    var parent = el;
    while ( (parent = parent.parentNode) && (parent.nodeName != 'FORM') && (parent.nodeName != 'BODY') ) { }
    return parent;
  }

  function hideSection ( section ) { section.style.display = 'none'; }

  function showSection ( section ) { section.style.display = 'block'; }

})();

