import { useContext, useEffect, useState } from "react"
import { CanvasContext } from "../contexts/CanvasContext"
import { Tool, NodeData } from "../util"

type NodeProps = {
    id: string,
    nodeData: NodeData
}

type MousePosition = {
    x: number,
    y: number
}

const Node = (props: NodeProps) => {

    const { toggleIsDragging, isDragging, updateSelected, updateNode, nodesMap, selected, tool } = useContext(CanvasContext)
    const {x, y, width, height, outline} = props.nodeData;
    const id = props.id;
    const [initialMousePosition, setInitialMousePosition] = useState<MousePosition | null>(null);

    useEffect(() => {
        // ensure "drag" and "endDrag" functions get the newest state
        if (tool === Tool.Select && isDragging && selected.has(id)) {
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", endDrag);
        }
    }, [isDragging]);

    const drag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const deltaX = e.clientX - initialMousePosition!.x;
        const deltaY = e.clientY - initialMousePosition!.y;
        const newPositionX = x + deltaX;
        const newPositionY = y + deltaY;
        for (const key of selected) {
            const updatedNode = {...nodesMap[key], x: newPositionX, y: newPositionY};
            updateNode(key, updatedNode);
        }
    }
    
    const endDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateSelected(new Set());
        toggleIsDragging(false);
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
    }

    const startDrag = <T extends React.MouseEvent>(e: T) => {
        e.preventDefault();
        e.stopPropagation();
        toggleIsDragging(true);
        updateSelected(new Set(id));
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="white"
            stroke={outline}
            key={id}
            onMouseDown={startDrag}
        />
    )
}

export default Node;