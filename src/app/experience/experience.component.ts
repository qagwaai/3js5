import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  viewChild
} from '@angular/core';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsPointMaterial } from 'angular-three-soba/materials';
import { NgtsPointsBuffer } from 'angular-three-soba/performances';
import { NgtsLine } from 'angular-three-soba/abstractions';
import { random } from 'maath';
import { Cube } from './components/cube.component';
import { Sphere } from './components/sphere.component';
import { DoubleSide } from 'three';

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

    <app-sphere [position]="[0, 1.5, 0]" />
    <app-cube [position]="[1.5, 0, 0]" />
    <app-cube [position]="[-1.5, 0, 0]" />

    <ngts-line
					[points]="[0, 0, 0, 0, 3, 0]"
					[options]="{
						raycast: null,
						side: DoubleSide,
						polygonOffset: true,
						polygonOffsetFactor: -10,
						renderOrder: 1,
						fog: false,
						transparent: true,
						lineWidth: 3,
						color: 'red',
						opacity: 100,
						depthTest: false,
					}"
				/>

    <ngts-orbit-controls [options]="{ enableZoom: true, enablePan: true }" />
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Cube, 
    Sphere, 
    NgtsLine, 
    NgtsPointsBuffer, 
    NgtsPointMaterial, 
    NgtsOrbitControls
  ],
})
export class Experience {
  protected readonly Math = Math;
  protected readonly DoubleSide = DoubleSide;
  protected readonly sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array;

	private pointsBufferRef = viewChild.required(NgtsPointsBuffer);

  constructor() { }
}
