export interface IVisualizer {
    
    /**
     * Render the next frame of the visualizer.
     */
    renderNextFrame(): void;
    
    /**
     * Draw the initial state on the canvas.
     */
    initialize(): void;
}