import { DOCUMENT } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { extend, getLocalState, injectBeforeRender, injectObjectEvents } from 'angular-three';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Cube } from './cube.component';
import { NgtsPointMaterial } from 'angular-three-soba/materials';
import { NgtsPointsBuffer } from 'angular-three-soba/performances';
import { random } from 'maath';

@Directive({
  selector: '[cursorPointer]',
  standalone: true,
})
export class CursorPointer {
  constructor() {
    const document = inject(DOCUMENT);
    const hostElement = inject<ElementRef<Mesh>>(ElementRef);
    const mesh = hostElement.nativeElement;

    const localState = getLocalState(mesh);
    if (!localState) return;

    injectObjectEvents(() => mesh, {
      pointerover: () => void (document.body.style.cursor = 'pointer'),
      pointerout: () => void (document.body.style.cursor = 'default'),
    });
  }
}

@Component({
  standalone: true,
  template: `
    <ngt-ambient-light [intensity]="0.5" />
    <ngt-spot-light [position]="10" [intensity]="0.5 * Math.PI" [angle]="0.15" [penumbra]="1" [decay]="0" />
    <ngt-point-light [position]="-10" [intensity]="0.5 * Math.PI" [decay]="0" />

    <ngt-group [rotation]="[0, 0, Math.PI / 4]">
			<ngts-points-buffer [positions]="sphere" [stride]="3" [options]="{ frustumCulled: false }">
				<ngts-point-material
					[options]="{ transparent: true, color: '#ccc', size: 0.005, sizeAttenuation: true, depthWrite: false }"
				/>
			</ngts-points-buffer>
		</ngt-group>

    <ngt-mesh
      #mesh
      cursorPointer
      (click)="clicked.set(!clicked())"
      (pointerover)="hovered.set(true)"
      (pointerout)="hovered.set(false)"
      [scale]="clicked() ? 1.5 : 1"
    >
      <ngt-box-geometry />
      <ngt-mesh-basic-material [color]="hovered() ? 'hotpink' : 'orange'" />
    </ngt-mesh>
    <app-cube [position]="[1.5, 0, 0]" />

    <ngts-orbit-controls [options]="{ enableZoom: true, enablePan: true }" />
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cube, CursorPointer,NgtsPointsBuffer, NgtsPointMaterial, NgtsOrbitControls],
})
export class Experience {
  protected readonly Math = Math;
  protected readonly sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array;

	private pointsBufferRef = viewChild.required(NgtsPointsBuffer);

  private meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

  protected hovered = signal(false);
  protected clicked = signal(false);

  constructor() {
    extend({ Mesh, BoxGeometry, MeshBasicMaterial });
    injectBeforeRender(({ delta }) => {
      const mesh = this.meshRef().nativeElement;
      mesh.rotation.x += delta;
      mesh.rotation.y += delta;
    });
  }
}
