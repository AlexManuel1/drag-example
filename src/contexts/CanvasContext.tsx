import { createContext, ReactNode, useState } from "react";

type ContextType = {
    isDragging: boolean,
    toggleIsDragging: (b: boolean) => void,
    selected: string[],
    updateSelected: (s: string[]) => void,
    nodes: NodeRecord,
    addNode: (n: Node) => void,
    updateNode: (s: string, n: Node) => void
}
type Node = {
    x: number,
    y: number,
    width: number,
    height: number,
    outline: string
}

export const CanvasContext = createContext<ContextType>({
    isDragging: false,
    toggleIsDragging: (b: boolean) => {},
    selected: [],
    updateSelected: (s: string[]) => {},
    nodes: {},
    addNode: (n: Node) => {},
    updateNode: (s: string, n: Node) => {}
});

type NodeRecord = Record<string, Node>;

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [nodes, setNodes] = useState<NodeRecord>({
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

    const toggleIsDragging = (b: boolean) => setIsDragging(b);
    const updateSelected = (s: string[]) => setSelected(s);
    const addNode = (n: Node) => {
        const key = Object.keys(nodes).length + 1;
        setNodes({...nodes, [key.toString()] : n});
    }
    const updateNode = (s: string, n: Node) => {
        let updatedNodes: NodeRecord = {};
        for (const key in nodes) {
            if (key === s) {
                updatedNodes[key] = n;
            } else {
                updatedNodes[key] = nodes[key];
            }
        }
        setNodes(updatedNodes);
    }

    return (
        <CanvasContext.Provider value={{
            isDragging,
            toggleIsDragging,
            selected,
            updateSelected,
            nodes,
            addNode,
            updateNode
        }}>
            {children}
        </CanvasContext.Provider>
    )
}
