// Importar las dependencias necesarias
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
import 'https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.js';

// Importar los módulos personalizados
import {clouds} from './clouds.js';
import {controls} from './controls.js';
import {game} from './game.js';
import {graphics} from './graphics.js';
import {math} from './math.js';
import {textures} from './textures.js';
import {voxels} from './voxels.js';

let _APP = null;

// Clase principal del juego que extiende de la clase base 'game.Game'
class SimonDevCraft extends game.Game {
  constructor() {
    super();
  }

  // Método llamado al inicializar el juego
  _OnInitialize() {
    this._entities = {};

    // Cargar el fondo del juego
    this._LoadBackground();

    // Crear una nueva instancia del 'TextureAtlas' y esperar a que cargue
    this._atlas = new textures.TextureAtlas(this);
    this._atlas.onLoad = () => {
      // Crear las entidades del juego una vez que el atlas de texturas haya cargado
      this._entities['_voxels'] = new voxels.SparseVoxelCellManager(this);
      this._entities['_clouds'] = new clouds.CloudManager(this);
      this._entities['_controls'] = new controls.FPSControls(
          {
            cells: this._entities['_voxels'],
            scene: this._graphics.Scene,
            camera: this._graphics.Camera
          });
    };
  }

  // Cargar el fondo del juego utilizando una textura cubemap
  _LoadBackground() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/posx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posx.jpg',
        './resources/posx.jpg',
    ]);
    this._graphics.Scene.background = texture;
  }

  _OnStep(timeInSeconds) {
    timeInSeconds = Math.min(timeInSeconds, 1 / 10.0);

    this._StepEntities(timeInSeconds);
  }

  _StepEntities(timeInSeconds) {
    for (let k in this._entities) {
      this._entities[k].Update(timeInSeconds);
    }
  }
}


function _Main() {
  _APP = new SimonDevCraft();
}

_Main();
