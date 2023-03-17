export enum Tool {
    Select = "Select",
    Move = "Move"
}

// may add more attributes
export type NodeData = {
    x: number,
    y: number,
    width: number,
    height: number,
    outline: string
}

// may add more attributes
export type GroupData = {
    nodes: Set<string>
}

export type NodeMap = { [key: string]: NodeData };
export type GroupMap = { [key: string]: GroupData };

export const generateAddedNodeKey = (nodes: NodeMap) => {
    const nodeNum = (Object.keys(nodes).length + 1).toString();
    return `Node${nodeNum}`;
}

export const generateAddedGroupKey = (nodes: NodeMap) => {
    const groupNum = (Object.keys(nodes).length + 1).toString();
    return `Group${groupNum}`;
}
