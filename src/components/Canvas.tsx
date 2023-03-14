import { useContext, useEffect } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import Node from "./Node";

const Canvas = () => {

    const { nodes, addNode, selected, isDragging } = useContext(CanvasContext);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <svg
            id="rootSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="1000"
            // onClick={(selected.length === 0) ? (e) => addNode({x: e.clientX, y: e.clientY, width: 100, height: 100, outline: "black"}) : undefined}
        >
            {Object.entries(nodes).map(([key, {x, y, width, height, outline}]) => {
                return <Node x={x} y={y} width={width} height={height} outline={outline} key={key} id={key}></Node>;
            })}
        </svg>
    )
}

export default Canvas;