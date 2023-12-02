import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-automatic-path-viewer',
  templateUrl: './automatic-path-viewer.component.html',
  styleUrls: ['./automatic-path-viewer.component.css']
})
export class AutomaticPathViewerComponent {

  @Input() path: string[] = [];
  @Input() cellsPath: string[][] = [];

  ngOnInit() {
    console.log("path:" + this.path);
  }
}
