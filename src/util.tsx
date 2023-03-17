export enum Tool {
    Select = "Select"
}

export type NodeData = {
    x: number,
    y: number,
    width: number,
    height: number,
    outline: string
}

export type GroupData = {
    nodes: Set<string>
}

export type NodeMap = { [key: string]: NodeData };
export type GroupMap = { [key: string]: GroupData };

export const genereateNodeKey = (nodes: NodeMap) => {
    const nodeNum = (Object.keys(nodes).length + 1).toString();
    return `Node${nodeNum}`;
}

export const generateGroupKey = (groups: GroupMap) => {
    const groupNum = (Object.keys(groups).length + 1).toString();
    return `Group${groupNum}`;
}
