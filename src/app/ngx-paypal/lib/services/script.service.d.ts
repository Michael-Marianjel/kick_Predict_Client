import { NgZone } from '@angular/core';
export declare class ScriptService {
    protected zone: NgZone;
    constructor(zone: NgZone);
    registerScript(url: string, globalVar: string, onReady: (globalVar: any) => void): void;
    cleanup(globalVar: string): void;
    private getElemId;
}
