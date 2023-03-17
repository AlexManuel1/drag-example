import { useState } from "react";

type MousePosition = {
    x: number,
    y: number
}

const useMousePosition = () : [MousePosition | null, (pos: MousePosition | null) => void] => {
    const [initialMousePosition, setInitialMousePosition] = useState<MousePosition | null>(null);

    return [initialMousePosition, setInitialMousePosition];
}

export default useMousePosition;