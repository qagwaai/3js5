import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild, signal, input } from '@angular/core';
import { injectBeforeRender, NgtVector3, NgtMeshStandardMaterial } from 'angular-three';
import { Mesh } from 'three';

@Component({
  selector: 'app-cube',
  standalone: true,
  template: `
    <ngt-mesh 
        #mesh
        [position]="position()"
        [scale]="clicked() ? 2.0 : 1"
        (pointerover)="hovered.set(true)"
        (pointerout)="hovered.set(false)"
        (click)="clicked.set(!clicked())"
    >
      <ngt-box-geometry />
      <ngt-mesh-standard-material [color]="hovered() ? 'darkred' : 'mediumpurple'" />
    </ngt-mesh>
  `,
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Cube {
  position = input<NgtVector3>([0, 0, 0,]);
  meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

  hovered = signal(false);
  clicked = signal(false);

  constructor() {
    injectBeforeRender(({ delta }) => {
      const mesh = this.meshRef().nativeElement;
      mesh.rotation.x += delta;
      mesh.rotation.y += delta;
    });
  }
}