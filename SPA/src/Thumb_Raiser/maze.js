import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBB } from "three/addons/math/OBB.js";
import { merge } from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Elevator from "./elevator.js";

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color,
 *  isDefault: boolean,
 *  doors: Door[],
 *  elevator: Elevator,
 *  cell: [number]
 * }
 */

export default class Maze extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        this.loaded = false;

        this.onLoad = function (description) {
            const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
            const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
            const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
            const minificationFilters = [THREE.NearestFilter, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter, THREE.LinearFilter, THREE.LinearMipmapNearestFilter, THREE.LinearMipmapLinearFilter];

            // Store the maze's size, map and exit location
            this.size = description.maze.size;
            this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
            this.map = description.maze.map;
            this.exitLocation = this.cellToCartesian(description.maze.exitLocation);
            //this.destinyLocation = this.cellToCartesian(this.cell);

            // Create the helpers
            this.helper = new THREE.Group();

            // Create the ground
            const ground = new Ground({
                size: new THREE.Vector3(description.ground.size.width, description.ground.size.height, description.ground.size.depth),
                segments: new THREE.Vector3(description.ground.segments.width, description.ground.segments.height, description.ground.segments.depth),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
                    mapUrl: description.ground.maps.color.url,
                    aoMapUrl: description.ground.maps.ao.url,
                    aoMapIntensity: description.ground.maps.ao.intensity,
                    displacementMapUrl: description.ground.maps.displacement.url,
                    displacementScale: description.ground.maps.displacement.scale,
                    displacementBias: description.ground.maps.displacement.bias,
                    normalMapUrl: description.ground.maps.normal.url,
                    normalMapType: normalMapTypes[description.ground.maps.normal.type],
                    normalScale: new THREE.Vector2(description.ground.maps.normal.scale.x, description.ground.maps.normal.scale.y),
                    bumpMapUrl: description.ground.maps.bump.url,
                    bumpScale: description.ground.maps.bump.scale,
                    roughnessMapUrl: description.ground.maps.roughness.url,
                    roughness: description.ground.maps.roughness.rough,
                    wrapS: wrappingModes[description.ground.wrapS],
                    wrapT: wrappingModes[description.ground.wrapT],
                    repeat: new THREE.Vector2(description.ground.repeat.u, description.ground.repeat.v),
                    magFilter: magnificationFilters[description.ground.magFilter],
                    minFilter: minificationFilters[description.ground.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16))
            });
            this.add(ground);

            // Create a wall
            const wall = new Wall({
                groundHeight: description.ground.size.height,
                segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
                    mapUrl: description.wall.maps.color.url,
                    aoMapUrl: description.wall.maps.ao.url,
                    aoMapIntensity: description.wall.maps.ao.intensity,
                    displacementMapUrl: description.wall.maps.displacement.url,
                    displacementScale: description.wall.maps.displacement.scale,
                    displacementBias: description.wall.maps.displacement.bias,
                    normalMapUrl: description.wall.maps.normal.url,
                    normalMapType: normalMapTypes[description.wall.maps.normal.type],
                    normalScale: new THREE.Vector2(description.wall.maps.normal.scale.x, description.wall.maps.normal.scale.y),
                    bumpMapUrl: description.wall.maps.bump.url,
                    bumpScale: description.wall.maps.bump.scale,
                    roughnessMapUrl: description.wall.maps.roughness.url,
                    roughness: description.wall.maps.roughness.rough,
                    wrapS: wrappingModes[description.wall.wrapS],
                    wrapT: wrappingModes[description.wall.wrapT],
                    repeat: new THREE.Vector2(description.wall.repeat.u, description.wall.repeat.v),
                    magFilter: magnificationFilters[description.wall.magFilter],
                    minFilter: minificationFilters[description.wall.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
            });

            // Build the maze
            let clonedWall;
            this.aabb = [];
            for (let i = 0; i <= this.size.depth; i++) { // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
                this.aabb[i] = [];
                for (let j = 0; j <= this.size.width; j++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                    this.aabb[i][j] = [];
                    /*
                     *  this.map[][] | North wall | West wall
                     * --------------+------------+-----------
                     *       0       |     No     |     No
                     *       1       |     No     |    Yes
                     *       2       |    Yes     |     No
                     *       3       |    Yes     |    Yes
                     */
                    if (this.map[i][j] == 2 || this.map[i][j] == 3) {
                        clonedWall = wall.clone();
                        clonedWall.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth);
                        this.add(clonedWall);
                        this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedWall).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.map[i][j] == 1 || this.map[i][j] == 3) {
                        clonedWall = wall.clone();
                        clonedWall.rotateY(Math.PI / 2.0);
                        clonedWall.position.set(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5);
                        this.add(clonedWall);
                        this.aabb[i][j][1] = new THREE.Box3().setFromObject(clonedWall).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                }
            }

            // Create Elevator of the floor and add it to the scene
            const elevator = new Elevator({
                elevator: description.floorElevator.location,
                halfSize: this.halfSize,
            });
            this.elevator = elevator;
            this.add(elevator);

            // Create Rooms of the floor and add it to the scene
            this.doors = [];
            description.room.forEach(d => {
                const door = new Door({
                    door: d.location,
                    halfSize: this.halfSize,
                });      
                this.doors.push(door);
                this.add(door);
            });

     
            var pngFiles = [
                'assets/models/artorias/textures/Mat_Chainmail_Base_Color.png', 'assets/models/artorias/textures/Mat_Chainmail_Metallic.png',
                'assets/models/artorias/textures/Mat_Chainmail_Normal_OpenGL.png','assets/models/artorias/textures/Mat_Chainmail_Roughness.png', 
                'assets/models/artorias/textures/Mat_Circle_Base_Color.png','assets/models/artorias/textures/Mat_Circle_Roughness.png', 
                'assets/models/artorias/textures/Mat_Helmet_Base_Color.png', 'assets/models/artorias/textures/Mat_Helmet_Metallic.png',
                'assets/models/artorias/textures/Mat_Helmet_Normal_OpenGL.png','assets/models/artorias/textures/Mat_Helmet_Roughness.png', 
                'assets/models/artorias/textures/Mat_PlateArmor_Base_Color.png','assets/models/artorias/textures/Mat_PlateArmor_Metallic.png',
                'assets/models/artorias/textures/Mat_PlateArmor_Normal_OpenGL.png','assets/models/artorias/textures/Mat_PlateArmor_Roughness.png',          
                'assets/models/artorias/textures/Mat_Skirt_Base_Color.png', 'assets/models/artorias/textures/Mat_Skirt_Metallic.png',
                'assets/models/artorias/textures/Mat_Skirt_Normal_OpenGL.png', 'assets/models/artorias/textures/Mat_Skirt_Roughness.png',
                'assets/models/artorias/textures/Sword_albedo.jpg', 'assets/models/artorias/textures/Sword_metallic.jpg',
                'assets/models/artorias/textures/Sword_roughness.jpg', 'assets/models/artorias/textures/Sword_normal.jpg'
            ];
 
            
                 
                // Load FBX Model      
                const artoriasLoader = new FBXLoader();
                artoriasLoader.load('assets/models/artorias/Artorias.fbx.fbx', (object) => {
                    // Create an array to hold materials for each DDS texture         
    
                    let materialsPNG = [];     
                
                    // Load Textures and create materials           
                    var textureLoader = new THREE.TextureLoader();  
                    pngFiles.forEach(function (filePath) {              
                        var texturePNG = textureLoader.load(filePath);             
                        materialsPNG.push(texturePNG);  
                    });

                    console.log("mat:" + materialsPNG)

                    object.position.set( 
                        5 - 5 + 0.5,        
                        0.01, 
                        5 - 5
                    );

                    // Assign materials to the FBX model
    
                    object.traverse(function (child) {
                      
                        switch (child.name) {
                            case 'Chainmail001':
                                const chainmail = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[0],
                                    metalnessMap: materialsPNG[1],
                                    normalMap: materialsPNG[2],
                                    roughnessMap: materialsPNG[3],
                                });
                                child.material = chainmail; 
                                break;
                            case 'Helmet001':
                                const helmet = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[6],
                                    metalnessMap: materialsPNG[7],
                                    normalMap: materialsPNG[8],
                                    roughnessMap: materialsPNG[9],
                                });
                                child.material = helmet;
                                break;
                            case 'Circle':
                                const circle = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[4],
                                    roughnessMap: materialsPNG[5],
                                });
                                child.material = circle;
                                break;
                            case 'Skirt001':
                                const skirt = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[14],
                                    metalnessMap: materialsPNG[15],
                                    normalMap: materialsPNG[16],
                                    roughnessMap: materialsPNG[17],
                                });
                                child.material = skirt;
                                break;
                            case 'Plate_Armor001':
                                const platearmor = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[10],
                                    metalnessMap: materialsPNG[11],
                                    normalMap: materialsPNG[12],
                                    roughnessMap: materialsPNG[13],
                                });
                                child.material = platearmor;
                                break;           
                            case 'Sword_Cylinder001':
                                const sword = new THREE.MeshStandardMaterial({
                                    map: materialsPNG[18],
                                    metalnessMap: materialsPNG[19],
                                    normalMap: materialsPNG[20],
                                    roughnessMap: materialsPNG[21],
                                });
                                child.material = sword;
                        }
                    });
                    

                    object.scale.set(0.0005, 0.0005, 0.0005);
                    this.add(object);
                });
                

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.player.initialPosition);
            this.initialDirection = description.player.initialDirection;

            this.loaded = true;
        
        }

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ").");
        }

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.halfSize.width + 0.5) * this.scale.x, 0.0, (position[0] - this.halfSize.depth + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.halfSize.depth), Math.floor(position.x / this.scale.x + this.halfSize.width)];
    }

    // Detect collision with corners (method: BC/AABB)
    cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
            const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
            if (x * x + z * z < radius * radius) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collision with walls (method: BC/AABB)
    wallCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (orientation != 0) {
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
            else {
                if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
        }
        return false;
    }

    // Detect collision with walls and corners (method: OBB/AABB)
    wallAndCornerCollision(indices, offsets, orientation, obb, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collisions
    collision(method, position, halfSize, direction) {
        const indices = this.cartesianToCell(position);
        if (method != "obb-aabb") {
            if (
                this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall") || // Collision with north wall
                this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall") || // Collision with west wall
                this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall") || // Collision with south wall
                this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall") || // Collision with east wall
                this.cornerCollision(indices, [1, 0], 1, position, { x: -0.475, z: -0.5 }, halfSize, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.cornerCollision(indices, [1, 1], 0, position, { x: -0.5, z: -0.525 }, halfSize, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.cornerCollision(indices, [1, 1], 1, position, { x: -0.525, z: -0.5 }, halfSize, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.cornerCollision(indices, [0, 1], 0, position, { x: -0.5, z: -0.475 }, halfSize, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                indices[0] > 0 && (
                    this.cornerCollision(indices, [-1, 1], 1, position, { x: -0.525, z: 0.5 }, halfSize, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.cornerCollision(indices, [-1, 0], 1, position, { x: -0.475, z: 0.5 }, halfSize, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.cornerCollision(indices, [0, -1], 0, position, { x: 0.5, z: -0.475 }, halfSize, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.cornerCollision(indices, [1, -1], 0, position, { x: 0.5, z: -0.525 }, halfSize, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
        else {
            // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
            const obb = new OBB(position, halfSize);
            obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
            if (
                this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
                this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
                this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
                this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall

                this.wallAndCornerCollision(indices, [1, 0], 1, obb, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 0, obb, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 1, obb, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [0, 1], 0, obb, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                indices[0] > 0 && (
                    this.wallAndCornerCollision(indices, [-1, 1], 1, obb, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.wallAndCornerCollision(indices, [-1, 0], 1, obb, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.wallAndCornerCollision(indices, [0, -1], 0, obb, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.wallAndCornerCollision(indices, [1, -1], 0, obb, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
    }

    doorCollision(position, halfSize) {
        const indices = this.cartesianToCell(position);
 
        if (
            this.doorColli(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, 'north door') || // Collision with north door)
            this.doorColli(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, 'west door')     // Collision with west door
        ) {
            return true;
        }
        return false;
    }
 
    doorColli(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
 
        for (let i = 0; i < this.doors.length; i++) {
            if (
                this.doors[i].door.positionX === column &&
                this.doors[i].door.positionY === row
            ) {
                if (orientation != 0) {
                    if (
                        Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius
                    ) {
                        console.log('Collision with ' + name + '.');  
                        this.changeDoor(this.doors[i]);
                        this.doors.splice(i, 1); // remove from array
                        return true;
                    }
                } else {
                    if (
                        Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius
                    ) {
                        console.log('Collision with ' + name + '.');
                        this.changeDoor(this.doors[i]); 
                        this.doors.splice(i, 1); // remove from array
                        return true;
                    }
                }
 
            }
        }
        return false;
    }
 
    async changeDoor(currentDoor) {
        let door;

        if(!currentDoor.isOpen) {
            door = new Door({
                door: currentDoor.door,
                halfSize: this.halfSize,
                isOpen: true,
                url: '',
            });
        }else{
            door = new Door({
                door: currentDoor.door,
                halfSize: this.halfSize,
                isOpen: false,
                url: '',
            });
        }
 
        this.remove(currentDoor); // remove current door
        this.add(door);
        await this.sleep(5000);
        this.doors.push(door); // add new door
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };

    foundDestiny(position) {
        return Math.abs(position.x - this.destinyLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.destinyLocation.z) < 0.5 * this.scale.z
    };

    foundCell(actual, destiny) {
        return Math.abs(actual.x - destiny.x) < 0.5 * this.scale.x && Math.abs(actual.z - destiny.z) < 0.5 * this.scale.z
    };

}