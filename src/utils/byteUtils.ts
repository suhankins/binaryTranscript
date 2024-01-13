export function float32ToUint8Array(float32: number) {
    const buffer = new ArrayBuffer(4);
    const dataview = new DataView(buffer);
    dataview.setFloat32(0, float32);
    return new Uint8Array(dataview.buffer);
}

export function uint8ArrayToFloat32(uint8array: Uint8Array) {
    const dataview = new DataView(uint8array.buffer);
    return dataview.getFloat32(0);
}

export function stringToUint8Array(string: string | null) {
    const encoder = new TextEncoder();
    return new Uint8Array([...encoder.encode(string || ''), 0]);
}

export function uint8ArrayToString(uint8array: Uint8Array) {
    const decoder = new TextDecoder('utf-8');
    const readBytes: number[] = [];
    let offset = 0;
    while (true) {
        const currentByte = uint8array[offset];
        if (currentByte === 0) {
            return {
                text: decoder.decode(new Uint8Array(readBytes)),
                bytesRead: readBytes.length + 1,
            };
        }
        readBytes.push(currentByte);
        offset++;
    }
}

export function byteToUint8Array(byte: number) {
    return new Uint8Array([byte]);
}

export function uint32ToUint8Array(uint32: number) {
    const buffer = new ArrayBuffer(4);
    const dataview = new DataView(buffer);
    dataview.setUint32(0, uint32);
    return new Uint8Array(dataview.buffer);
}

export function uint8ArrayToUint32(uint8array: Uint8Array) {
    const dataview = new DataView(uint8array.buffer);
    return dataview.getUint32(0);
}

export function combineUint8Arrays(...uint8arrays: Uint8Array[]) {
    return new Uint8Array(uint8arrays.flatMap((value) => [...value]));
}
