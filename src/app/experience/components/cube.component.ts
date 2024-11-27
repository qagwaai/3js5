import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, viewChild } from '@angular/core';
import { injectBeforeRender, NgtVector3 } from 'angular-three';
import { Mesh } from 'three';
import { CursorPointer } from './cursor-pointer.component';

@Component({
  selector: 'app-cube',
  standalone: true,
  template: `
    <ngt-mesh 
        #mesh
        cursorPointer
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
  imports: [CursorPointer],
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