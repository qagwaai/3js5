import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    inject
} from '@angular/core';
import { getLocalState, injectObjectEvents } from 'angular-three';
import { Mesh } from 'three';

@Directive({
    selector: '[cursorPointer]',
    standalone: true,
})
export class CursorPointer {

    constructor(private el: ElementRef) {
        const document = inject(DOCUMENT);
        //const hostElement = inject<ElementRef<Mesh>>(ElementRef);
        const mesh = el.nativeElement;

        const localState = getLocalState(mesh);
        if (!localState) return;

        injectObjectEvents(() => mesh, {
            pointerover: () => void (document.body.style.cursor = 'pointer'),
            pointerout: () => void (document.body.style.cursor = 'default'),
        });
    }
}