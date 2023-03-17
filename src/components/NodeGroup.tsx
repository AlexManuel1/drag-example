import { useEffect, useContext, useState } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import { NodeData, GroupMap, NodeMap } from "../util";
import Node from './Node';

const NodeGroup = () => {

    const { groupsMap, nodesMap } = useContext(CanvasContext);
    const [ groupedNodeData, setGroupedNodeData ] = useState<NodeMap[][]>([]);

    const mapGroupDataToNodeData = (groups: GroupMap): NodeMap[][] => {
        let arrayOfNodeGroups = []
        for (const groupData of Object.values(groups)) {
            let nodeGroup = []
            for (const node of groupData.nodes) {
                nodeGroup.push({node: nodesMap[node]});
            }
            arrayOfNodeGroups.push(nodeGroup);
        }
        return arrayOfNodeGroups;
    }

    //const [mapGroupToNode, setMapGroupToNode] = useState<NodeData[][]>([]);

    useEffect(() => {
        setGroupedNodeData(mapGroupDataToNodeData(groupsMap));
    }, [groupsMap, nodesMap]);
 
    return (
        <>
            {groupedNodeData.map((nodeDataArray, index) => 
                <g key={index}>
                    {nodeDataArray.map(nodeData => {
                        const nodeKey = Object.keys(nodeData)[0];
                        const node = Object.values(nodeData)[0];
                        return <Node nodeData={node} key={nodeKey} id={nodeKey}/>
                    })}
                </g>
            )}
        </>
    )
}

export default NodeGroup;