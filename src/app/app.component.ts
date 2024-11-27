import { Component } from '@angular/core';
import { NgtCanvas, extend } from 'angular-three';
import { Experience } from './experience/experience.component';

import { 
  Mesh, 
  BoxGeometry, 
  MeshBasicMaterial, 
  MeshStandardMaterial, 
  AmbientLight, 
  SpotLight, 
  PointLight, 
  SphereGeometry, 
  EllipseCurve, 
  LineBasicMaterial, 
  Line, 
  Vector3 
} from 'three';

extend({
  Mesh,
  BoxGeometry,
  SphereGeometry,
  EllipseCurve,
  Line,

  // Materials
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,

  // lights
  AmbientLight,
  SpotLight,
  PointLight,

  // Misc
  Vector3
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
