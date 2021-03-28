import { IKernelFunctionThis } from "gpu.js";
import { StateColors } from "../utils";

export type DimensionConstants = {
    rendererWidth: number,
    rendererHeight: number
}

export type AutomataConstants = {
    threshold: number,
    numStates: number,
    range: number
} & DimensionConstants;

export type GameOfLifeThis = {
    constants: DimensionConstants
} & IKernelFunctionThis;

export type AutomataThis = {
    constants: AutomataConstants
} & IKernelFunctionThis;

export type RendererThis = {
    constants: StateColors
} & IKernelFunctionThis; 