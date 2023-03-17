import { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import Node from "./Node";
import NodeGroup from "./NodeGroup";
import useMousePosition from "../hooks/useMousePosition";
import useRectangleSelection from "../hooks/useRectangleSelection";

const Canvas = () => {
    const { toggleIsDragging, isDragging, selected } = useContext(CanvasContext);
    const { startRectangleSelection, rectangleSelection } = useRectangleSelection();

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <svg
            id="rootSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="1000"
            onMouseDown={startRectangleSelection}
        >
            <NodeGroup />
            {
                rectangleSelection && 
                <rect 
                    x={rectangleSelection.x} 
                    y={rectangleSelection.y} 
                    width={rectangleSelection.width} 
                    height={rectangleSelection.height}
                    stroke={rectangleSelection.outlineColor}
                    fill="transparent"
                    strokeDasharray="3 2"
                />
            }
        </svg>
    )
}

export default Canvas;