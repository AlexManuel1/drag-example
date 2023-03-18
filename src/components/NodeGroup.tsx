import { useEffect, useContext, useState } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import { GroupMap } from "../util";
import Node from './Node';

const NodeGroup = () => {

    const { groupsMap, nodesMap, selected } = useContext(CanvasContext);
    const [ groupedNodeData, setGroupedNodeData ] = useState<JSX.Element[]>([]);

    const setIsEqual = <T extends any>(set1: Set<T>, set2: Set<T>) => {
        return set1.size === set2.size && [...set1].every((x) => set2.has(x));
    }

    const createNodeJSXFromGroupData = (groups: GroupMap): JSX.Element[] => {
        let arrayOfNodeGroups = [];
        for (const [groupKey, groupData] of Object.entries(groups)) {
            // turn groupData.nodes into an array and map it to JSX
            let nodeGroup = 
                <svg key={groupKey} stroke={setIsEqual(groupData.nodes, selected) ? "blue" : "black"}>
                    {[...groupData.nodes].map((nodeKey) => {
                        const nodeData = nodesMap[nodeKey];
                        return <Node nodeData={nodeData} key={nodeKey} id={nodeKey}/>
                    })}
                </svg>;
            arrayOfNodeGroups.push(nodeGroup);
        }
        return arrayOfNodeGroups;
    }

    useEffect(() => {
        setGroupedNodeData(createNodeJSXFromGroupData(groupsMap));
    }, [groupsMap, nodesMap]);
 
    return (
        <>
            {groupedNodeData}
        </>
    )
}

export default NodeGroup;