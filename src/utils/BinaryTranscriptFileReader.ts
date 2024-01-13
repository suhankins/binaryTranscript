import {
    uint8ArrayToFloat32,
    uint8ArrayToString,
    uint8ArrayToUint32,
} from './byteUtils.ts';

export default class BinaryTranscriptFileReader {
    data: Uint8Array;
    pointer = 0;

    constructor(path: string) {
        this.data = Deno.readFileSync(path);
    }

    private readBytes(numberOfBytes: number) {
        const bytes = this.data.slice(
            this.pointer,
            this.pointer + numberOfBytes
        );
        this.pointer += numberOfBytes;
        return bytes;
    }
    readByte() {
        return this.readBytes(1)[0];
    }
    readString() {
        const { text, bytesRead } = uint8ArrayToString(
            this.data.slice(this.pointer)
        );
        this.pointer += bytesRead;
        return text;
    }
    readFloat32() {
        return uint8ArrayToFloat32(this.readBytes(4));
    }
    readUint32() {
        return uint8ArrayToUint32(this.readBytes(4));
    }
}
