import * as THREE from "three";
import { merge } from "./merge.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

/*
 * parameters = {
 *  url: String,
 *  door: {positionX: Number, positionY: Number, direction: String},
 *  halfSize: {width: Number, depth: Number},
 *  isOpen: boolean
 * }
 */
export default class Door extends THREE.Group {
  constructor(parameters) {
    super();
    merge(this, parameters);

    this.loaded = false;

    this.onLoad = function (object) {

      if(this.isOpen) {
        object.scale.set(0.006, 0.004, 0.005);
      }else{
        object.scale.set(0.006, 0.004, 0.003);
        }

      if (this.isOpen && this.door.direction === "north") {
        // Ajuste as coordenadas de posição para centralizar a porta aberta
        object.position.set(
          this.door.positionX - this.halfSize.width + 0.5,
          0,
          this.door.positionY - this.halfSize.depth
        );
      } else if (this.isOpen && this.door.direction !== "north") {
        // Adicione a condição para a porta aberta quando a direção não é "north"
        object.rotateY(Math.PI / 2.0);
        object.position.set(
          this.door.positionX - this.halfSize.width,
          0,
          this.door.positionY - this.halfSize.depth + 0.5
        );
      } else if (this.door.direction === "north") {
        // Ajuste as coordenadas de posição para centralizar a porta fechada
        object.position.set(
          this.door.positionX - this.halfSize.width + 1,
          0,
          this.door.positionY - this.halfSize.depth
        );
      } else {
        // Ajuste as coordenadas de posição para centralizar a porta fechada
        object.rotateY(Math.PI / 2.0);
        object.position.set(
          this.door.positionX - this.halfSize.width,
          0,
          this.door.positionY - this.halfSize.depth
        );
      }



      // Add the door object to the scene
      this.add(object);
      this.loaded = true;
    };

    const onProgress = function (url, xhr) {
      console.log(
        "Resource '" +
          url +
          "' " +
          ((100.0 * xhr.loaded) / xhr.total).toFixed(0) +
          "% loaded."
      );
    };

    const onError = function (url, error) {
      console.error("Error loading resource '" + url + "' (" + error + ").");
    };

    // Create a resource .fbx file loader
    const loader = new OBJLoader();
    const secDoorLoader = new FBXLoader();
    const mtlLoader = new MTLLoader();

    if(this.isOpen) {
      this.url = "assets/models/DoubleDoor.fbx";

      secDoorLoader.load(
        //Resource URL
        this.url,

        // onLoad callback
        (object) => this.onLoad(object),

        // onProgress callback
        (xhr) => onProgress(this.url, xhr),

        // onError callback
        (error) => onError(this.url, error)
      );

    }else {

      // Load a model description resource file
      this.url = "assets/models/WoodDoubleDoor/double_door_2.obj";
      mtlLoader.load('assets/models/WoodDoubleDoor/double_door_2.mtl', (materials) => {
        materials.preload();
        loader.setMaterials(materials);
        loader.load(
          //Resource URL
          this.url,

          // onLoad callback
          (object) => this.onLoad(object),

          // onProgress callback
          (xhr) => onProgress(this.url, xhr),

          // onError callback
          (error) => onError(this.url, error)
        );
      });

    }


  }
}
