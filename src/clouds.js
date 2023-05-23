//DOCUMENTACION MINECRAFT
		
		import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
		import { WEBGL } from 'https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/WebGL.js';
		import { graphics } from './graphics.js';

		export const game = (function() {
		return {
			Game: class {
			constructor() {
				this._Initialize();
			}

			// Initialize the game
			_Initialize() {
				// Create a graphics object and initialize WebGL
				this._graphics = new graphics.Graphics(this);
				if (!this._graphics.Initialize()) {
				// Display an error message if WebGL2 is not available
				this._DisplayError('WebGL2 is not available.');
				return;
				}

				this._previousRAF = null;

				// Call the _OnInitialize function defined in the child class
				this._OnInitialize();

				// Begin rendering the game
				this._RAF();
			}

			// Display an error message on the webpage
			_DisplayError(errorText) {
				const error = document.getElementById('error');
				error.innerText = errorText;
			}

			// Request animation frame and render the game
			_RAF() {
				requestAnimationFrame((t) => {
				if (this._previousRAF === null) {
					this._previousRAF = t;
				}
				this._Render(t - this._previousRAF);
				this._previousRAF = t;
				});
			}

			// Render the game
			_Render(timeInMS) {
				const timeInSeconds = timeInMS * 0.001;

				// Call the _OnStep function defined in the child class
				this._OnStep(timeInSeconds);

				// Render the graphics using WebGL
				this._graphics.Render(timeInSeconds);

				// Call _RAF to continue rendering the game
				this._RAF();
			}
			}
		};
		})();
