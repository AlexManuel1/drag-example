import { createContext, ReactNode, useState } from "react";
import { Tool, NodeData, NodeMap, GroupData, GroupMap, genereateNodeKey, generateGroupKey } from "../util";

type ContextType = {
    tool: Tool,
    isDragging: boolean,
    toggleIsDragging: (b: boolean) => void,
    selected: Set<string>,
    updateSelected: (s: Set<string>) => void,
    nodesMap: NodeMap,
    groupsMap: GroupMap,
    addNode: (n: NodeData) => void,
    updateNode: (s: string, n: NodeData) => void
}

export const CanvasContext = createContext<ContextType>({
    tool: Tool.Select,
    isDragging: false,
    toggleIsDragging: (b: boolean) => {},
    selected: new Set(),
    updateSelected: (s: Set<string>) => {},
    nodesMap: {},
    groupsMap: {},
    addNode: (n: NodeData) => {},
    updateNode: (s: string, n: NodeData) => {}
});

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [tool, setTool] = useState(Tool.Select);
    const [nodesMap, setNodesMap] = useState<NodeMap>({
        "1": {
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            outline: "black"
        },
        "2": {
            x: 100,
            y: 400,
            width: 200,
            height: 200,
            outline: "black"
        }
    });
    const [groupsMap, setGroupsMap] = useState<GroupMap>({
        "1": {
            nodes: new Set("1")
        },
        "2": {
            nodes: new Set("2")
        }
    });

    const toggleIsDragging = (b: boolean) => setIsDragging(b);
    const updateSelected = (s: Set<string>) => setSelected(s);

    const addNode = (n: NodeData) => {
        const nodeKey = genereateNodeKey(nodesMap);
        const groupKey = generateGroupKey(groupsMap);
        setNodesMap({...nodesMap, [nodeKey] : n});
        setGroupsMap({...groupsMap, [groupKey] : { 
            nodes: new Set(nodeKey) 
        }});
    }
    const updateNode = (s: string, n: NodeData) => {
        let updatedNodes: NodeMap = {};
        for (const key in nodesMap) {
            if (key === s) {
                updatedNodes[key] = n;
            } else {
                updatedNodes[key] = nodesMap[key];
            }
        }
        setNodesMap(updatedNodes);
    }

    return (
        <CanvasContext.Provider value={{
            tool,
            isDragging,
            toggleIsDragging,
            selected,
            updateSelected,
            nodesMap,
            groupsMap,
            addNode,
            updateNode
        }}>
            {children}
        </CanvasContext.Provider>
    )
}
