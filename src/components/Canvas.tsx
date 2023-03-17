import { useContext, useEffect } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import Node from "./Node";
import NodeGroup from "./NodeGroup";

const Canvas = () => {

    const { nodesMap, addNode, selected } = useContext(CanvasContext);

    useEffect(() => {
        //console.log(selected);
    }, [selected]);

    return (
        <svg
            id="rootSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="1000"
        >
            <NodeGroup />
            {Object.entries(nodesMap).map(([nodeKey, node]) => {
                return <Node nodeData={node} key={nodeKey} id={nodeKey} />;
            })}
        </svg>
    )
}

export default Canvas;