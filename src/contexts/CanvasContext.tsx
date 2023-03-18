import { createContext, ReactNode, useState } from "react";
import { Tool, NodeData, NodeMap, GroupData, GroupMap, generateAddedNodeKey, generateAddedGroupKey } from "../util";

type ContextType = {
    tool: Tool,
    selectTool: (t: Tool) => void,
    isDragging: boolean,
    toggleIsDragging: (b: boolean) => void,
    selected: Set<string>,
    updateSelected: (s: Set<string>) => void,
    nodesMap: NodeMap,
    groupsMap: GroupMap,
    addNode: (n: NodeData) => void,
    updateNode: (s: string, n: NodeData) => void,
    updateGroupsMapFromSelected: () => void
}

export const CanvasContext = createContext<ContextType>({
    tool: Tool.Select,
    selectTool: (t: Tool) => {},
    isDragging: false,
    toggleIsDragging: (b: boolean) => {},
    selected: new Set(),
    updateSelected: (s: Set<string>) => {},
    nodesMap: {},
    groupsMap: {},
    addNode: (n: NodeData) => {},
    updateNode: (s: string, n: NodeData) => {},
    updateGroupsMapFromSelected: () => {}
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
    const selectTool = (t: Tool) => setTool(t);
    const addNode = (n: NodeData) => {
        const nodeKey = generateAddedNodeKey(nodesMap);
        const groupKey = generateAddedGroupKey(nodesMap);
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
        console.log("updateNode function: ", updatedNodes);
        setNodesMap(updatedNodes);
    }
    const updateGroupsMapFromSelected = () => {
        const newGroupsMap: GroupMap = {};
        let groupKey = 1;
        if (selected.size > 0) {
            newGroupsMap[`Group${groupKey}`] = { nodes: new Set(selected) };
            groupKey += 1;
        }
        for (const [nodeKey, nodeData] of Object.entries(nodesMap)) {
            if (!selected.has(nodeKey)) {
                newGroupsMap[`Group${groupKey}`] = { nodes: new Set(nodeKey) }
                groupKey += 1;
            }
        }
        setGroupsMap(newGroupsMap);
    }

    return (
        <CanvasContext.Provider value={{
            tool,
            selectTool,
            isDragging,
            toggleIsDragging,
            selected,
            updateSelected,
            nodesMap,
            groupsMap,
            addNode,
            updateNode,
            updateGroupsMapFromSelected
        }}>
            {children}
        </CanvasContext.Provider>
    )
}
