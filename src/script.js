let playlist = [ {
  'title': 'ANGIE CHAVEZ & ORQ - Ven devorame otra vez',
  'audio': "https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FANGIE%20CHAVEZ%20%26%20Orq%20-%20Ven%2C%20dev%C3%B3rame%20otra%20vez%20(2022).mp3?alt=media&token=54cbb0d6-ae9b-4a8d-acf9-ccec86461137",
}, {
  'title': 'ALVARO ROD - Preso (Salsa Version)',
  'audio': "https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FALVARO%20ROD%20-%20Preso%20(Salsa%20Live%20Session).mp3?alt=media&token=7dae780a-d392-44b2-906b-70676e728cb1",
}, {
  'title': 'GIGANTES DE LA SALSA - El hombre que yo amo',
  'audio': "https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FGIGANTES%20DE%20LA%20SALSA%20-%20El%20hombre%20que%20yo%20amo.mp3?alt=media&token=13a086f5-35b0-4ecd-ac11-ad80de6b1b4f",
},{ 
  'title':'KAROL G ft SHAKIRA - TQG (Version Salsa)',
  'audio': 'https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FKAROL%20G%20%26%20SHAKIRA%20-%20TQG%20(Version%20Salsa%20Jane%20Riascos).mp3?alt=media&token=bc45b841-5370-45e7-ab02-0703c91c6621', 
},{ 
    'title':'LA SOLUCION - Abrazame muy fuerte',
    'audio': 'https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FLA%20SOLUCION%20-%20Abrazame%20Muy%20Fuerte.mp3?alt=media&token=b511a479-eff8-4d45-ba5a-a3c1d8d2c3e7', 
},{ 
    'title':'SENSACION SALSERA - Con la misma moneda',
    'audio': 'https://firebasestorage.googleapis.com/v0/b/ucrania-proj.appspot.com/o/Mp3%2FSalsas%2FSENSACION%20SALSERA%20-%20Con%20la%20misma%20moneda.mp3?alt=media&token=9ad88387-b454-4a27-964f-58a36a2f50f2', 
}    
];

i = 0;
n = playlist.length;
let player = document.getElementById( 'player' );
let dur = document.getElementById( 'dur' );
playlist.forEach( function( i ) {
  console.log( i.audio )
  player.src = i.audio;
  $( '.title' ).html( i.title );
}, );

function calculateTotalValue( length ) {
   minutes = Math.floor( length / 60 ),
   seconds_int = length - minutes * 60,
   seconds_str = seconds_int.toString(),
   seconds = parseInt(seconds_str),   
   seconds = ("0" + seconds).slice(-2),
   time = minutes + ':' + seconds
  return time;
}

function calculateCurrentValue( currentTime ) {
  let current_hour = parseInt( currentTime / 3600 ) % 24,
    current_minute = parseInt( currentTime / 60 ) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed( ),
    current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
  return current_time;
}

function initProgressBar( ) {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue( length )
  jQuery( ".end-time" ).html( totalLength );
  let currentTime = calculateCurrentValue( current_time );
  jQuery( ".start-time" ).html( currentTime );
  dur.value = player.currentTime;
  if ( player.currentTime == player.duration ) {
    $( "#play-btn" ).fadeIn( "slow", function( ) {
      $( this ).removeClass( "fa-pause" );
      $( this ).addClass( "fa-play" );
      dur.value = 0;
    } );
  }
};

function mSet( ) {
  player.currentTime = dur.value;
}

function mDur( ) {
  let length = player.duration;
  dur.max = length;
}

function initPlayers( num ) {
  for ( let k = 0; k < num; k++ ) {
    ( function( ) {
      let playerContainer = document.getElementById( 'player-container' ),
        player = document.getElementById( 'player' ),
        isPlaying = false,
        playBtn = document.getElementById( 'play-btn' );
      if ( playBtn != null ) {
        playBtn.addEventListener( 'click', function( ) {
          togglePlay( )
        } );
      }

      function togglePlay( ) {
        if ( player.paused === false ) {
          player.pause( );
          isPlaying = false;
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-pause" );
            $( this ).addClass( "fa-play" );
          } );
        }
        else {
          player.play( );
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-play" );
            $( this ).addClass( "fa-pause" );
          } );
          isPlaying = true;
        }
      }
    }( ) );
  }
}
$( "#next" ).data( 'dir', 1 );
$( "#prev" ).data( 'dir', -1 );
$( '#next, #prev' ).on( 'click', function( ) {
  i = ( i + $( this ).data( 'dir' ) + n ) % n;
  console.log( i );
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  $( '#play-btn' ).removeClass( "fa-play" );
  $( '#play-btn' ).addClass( "fa-pause" );
  player.play( );
} );

$( ".audio-player" )
  .toArray( )
  .forEach( function( player ) {
    let audio = $( player ).find( "audio" )[ 0 ];
    let volumeControl = $( player ).find( ".volumeControl .wrapper" );
    volumeControl.find( ".outer" ).on( "click", function( e ) {
      let volumePosition = e.pageX - $( this ).offset( ).left;
      let audioVolume = volumePosition / $( this ).width( );
      if ( audioVolume >= 0 && audioVolume <= 1 ) {
        audio.volume = audioVolume;
        $( this )
          .find( ".inner" )
          .css( "width", audioVolume * 100 + "%" );
      }
    } );
  } );

$( function( ) {
  // Dropdown toggle
  $( '.dropdown-toggle' ).click( function( ) {
    $( this ).next( '.dropdown' ).slideToggle( "fast" );
  } );
  $( document ).click( function( e ) {
    var target = e.target;
    if ( !$( target ).is( '.dropdown-toggle' ) && !$( target ).parents( ).is( '.dropdown-toggle' ) ) {
      $( '.dropdown' ).hide( );
    }
  } );
} );

$( '#darkButton' ).click( switchDark );
$( '#whiteButton' ).click( switchWhite );
$( '#blueButton' ).click( switchBlue );

function switchDark( ) {
  $( '#skin' ).attr( 'class', 'dark audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}

function switchWhite( ) {
  $( '#skin' ).attr( 'class', 'white audio-player' );
  $( '.inner' ).css( 'background', '#555' );
  $( '.title' ).css( 'color', '#555' );
  $( '.time' ).css( 'color', '#555' );
  $( '.fa-volume-up' ).css( {
    'color': '#555'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
}

function switchBlue( ) {
  $( '#skin' ).attr( 'class', 'blue audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}
initPlayers( jQuery( '#player-container' ).length );
