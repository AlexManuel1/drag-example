import { useContext } from "react"
import { CanvasContext } from "../contexts/CanvasContext"

type NodeProps = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    outline: string
}

const Node = (props: NodeProps) => {

    const { toggleIsDragging, updateSelected, updateNode, nodes, selected } = useContext(CanvasContext)
    const {x, y, width, height, outline, id} = props;

    const startDrag = <T extends React.MouseEvent>(e: T) => {
        e.preventDefault();
        e.stopPropagation();
        updateSelected([id]);
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
    }

    const drag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(selected);
        for (let key of selected) {
            const newNode = {...nodes[key], x: e.clientX, y: e.clientY};
            updateNode(key, newNode);
        }
    }
    
    const endDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleIsDragging(false);
        updateSelected([]);
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
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