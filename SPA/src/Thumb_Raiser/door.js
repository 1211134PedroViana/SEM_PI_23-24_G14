import * as THREE from "three";
import { merge } from "./merge.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

/*
 * parameters = {
 *  url: String,
 *  door: {positionX: Number, positionY: Number, direction: String},
 *  halfSize: {width: Number, depth: Number},
 * }
 */
export default class Door extends THREE.Group {
  constructor(parameters) {
    super();
    merge(this, parameters);

    this.loaded = false;

    this.onLoad = function (object) {
        object.scale.set(0.16, 0.1, 0.1);
      if (this.door.direction === "north") {
        object.position.set(
            this.door.positionX - this.halfSize.width + 0.5, 
            0, 
            this.door.positionY - this.halfSize.depth);
      } else {
        object.rotateY(Math.PI / 2.0);
        object.position.set(
            this.door.positionX - this.halfSize.width, 
            0, 
            this.door.positionY - this.halfSize.depth + 0.5);
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
    const mtlLoader = new MTLLoader();

    // Load a model description resource file
    this.url = "assets/models/WoodDoubleDoor/WoodDoubleDoor.obj";

    mtlLoader.load('assets/models/WoodDoubleDoor/WoodDoubleDoor.mtl', (materials) => {
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