import * as THREE from "three";

export default class Animations_elevator {
    constructor(object, animations_elevator) {
        this.states = ["02_open"];
        this.mixer = new THREE.AnimationMixer(object);
        this.actionInProgress = false;
        this.actions = {};

        console.log("anime elevator");
        console.log(animations_elevator);

        for (let i = 0; i < animations_elevator.length; i++) {
            const clip = animations_elevator[i];
            const action = this.mixer.clipAction(clip);
            this.actions[clip.name] = action;
        }

        //this.activeName = "02_open";
        //this.actions[this.activeName].play();
    }

    fadeToAction(name, duration) {
        if (this.activeName !== name && !this.actionInProgress) {
            const previousName = this.activeName;
            this.activeName = name;

            // Desvanecer e reproduzir a nova ação
            this.actions[previousName].fadeOut(duration);
            this.actions[this.activeName]
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(duration)
                .play();

            this.mixer.addEventListener("finished", event => this.actionFinished(event));
            this.actionInProgress = true;
        }
    }

    actionFinished() {
        if (this.actionInProgress) {
            this.actionInProgress = false;
            this.mixer.removeEventListener("finished", this.actionInProgress);
        }
    }

    update(deltaT) {
        if (this.mixer) {
            this.mixer.update(deltaT);
        }
    }
}