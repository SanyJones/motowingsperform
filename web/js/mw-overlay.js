(function() {
	var triggerBttn = document.getElementById( 'racingSupport' ),
		overlay = document.querySelector( 'div#AB' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
			
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			showBlock();
		}
		
	}
	function showBlock() {
		var splitContent = document.querySelector('.dual__content'),
		rev1 = new RevealFx(document.querySelector('#rev-1'), {
			revealSettings : {
				bgcolor: '#2d2c2c',
				direction: 'rl',
				duration: 800,
				easing: 'easeInOutCirc',
				coverArea: 50,
				onCover: function(contentEl, revealerEl) {
					contentEl.style.opacity = 1;
					splitContent.classList.add('dual__content--show');
				}
			}
		});

		rev1.reveal();
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})();
