import { useState, useEffect, useContext } from 'react';
import { CanvasContext } from '../contexts/CanvasContext';
import { NodeData, Tool } from '../util';
import useMousePosition from './useMousePosition';

type RectangleSelection = {
    x: number,
    y: number,
    width: number,
    height: number,
    outlineColor: string,
}

const useRectangleSelection = () => {
    const { selected, updateSelected, toggleIsDragging, isDragging, tool, selectTool, nodesMap, groupsMap, updateGroupsMapFromSelected } = useContext(CanvasContext);
    const [initialMousePosition, setInitialMousePosition] = useMousePosition();
    const [rectangleSelection, setRectangleSelection] = useState<RectangleSelection | null>(null);

    useEffect(() => {
        if (tool === Tool.Select && isDragging) {
            document.addEventListener("mousemove", continueRectangleSelection);
            document.addEventListener("mouseup", endRectangleSelection);
        }
    }, [rectangleSelection]);

    const startRectangleSelection = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        selectTool(Tool.Select);
        toggleIsDragging(true);
        setInitialMousePosition({x: e.clientX, y: e.clientY});
        setRectangleSelection({x: e.clientX, y: e.clientY, width: 0, height: 0, outlineColor: "blue"});
    }

    const continueRectangleSelection = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const x = Math.min(e.clientX, initialMousePosition!.x);
        const y = Math.min(e.clientY, initialMousePosition!.y);
        const width = Math.abs(e.clientX - initialMousePosition!.x);
        const height = Math.abs(e.clientY - initialMousePosition!.y);
        setRectangleSelection({...rectangleSelection!, x, y, width, height});
        markNodesAsSelected();
        updateGroupsMapFromSelected();
    }

    const endRectangleSelection = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleIsDragging(false);
        setRectangleSelection(null);
        document.removeEventListener("mousemove", continueRectangleSelection);
        document.removeEventListener("mouseup", endRectangleSelection);
    }

    const markNodesAsSelected = () => {
        let newSelected: Set<string> = new Set();
        //console.log(nodesMap);
        for (const [nodeKey, nodeData] of Object.entries(nodesMap)) {
            // check if x, y, width, and height of node is within rectangle Selection
            const nodeIsSelected = 
                rectangleSelection && 
                nodeData.x > rectangleSelection.x && 
                nodeData.y > rectangleSelection.y &&
                nodeData.width + nodeData.x < rectangleSelection.width + rectangleSelection.x &&
                nodeData.height + nodeData.y < rectangleSelection.height + rectangleSelection.y;
            // console.log(nodeIsSelected); 
            // console.log(nodeData.x, rectangleSelection!.x);
            // console.log(nodeData.y, rectangleSelection!.y);
            // console.log(nodeData.width + nodeData.x, rectangleSelection!.width + rectangleSelection!.x);
            // console.log(nodeData.height + nodeData.y,  rectangleSelection!.height + rectangleSelection!.y);
            if (nodeIsSelected) {
                //console.log(`${nodeKey} is Selected: `, nodeKey);
                newSelected.add(nodeKey);
            }
        }
        updateSelected(newSelected);
    }

    return { startRectangleSelection, rectangleSelection };
}

export default useRectangleSelection;