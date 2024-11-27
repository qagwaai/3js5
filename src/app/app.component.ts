import { Component } from '@angular/core';
import { NgtCanvas, extend } from 'angular-three';
import { Experience } from './experience/experience.component';

import { Mesh, BoxGeometry, MeshBasicMaterial, MeshStandardMaterial, AmbientLight, SpotLight, PointLight } from 'three';

extend({
  Mesh,
  BoxGeometry,

  // Materials
  MeshBasicMaterial,
  MeshStandardMaterial,

  // lights
  AmbientLight,
  SpotLight,
  PointLight
});

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ngt-canvas [sceneGraph]="sceneGraph" />
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas],
})
export class AppComponent {
  sceneGraph = Experience;
}
