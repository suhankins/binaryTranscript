import BinaryTranscriptFileReader from './utils/BinaryTranscriptFileReader.ts';

const fileReader = new BinaryTranscriptFileReader(Deno.args[0]);

/*
 * Speakers
 */
const speakers: string[] = [];
const speakersCount = fileReader.readByte();
for (let i = 0; i < speakersCount; i++) {
    speakers.push(fileReader.readString());
}

/*
 * Utterances
 */
const utterances: {
    speaker: string;
    text: string;
    start: number;
}[] = [];
const utterancesCount = fileReader.readUint32();
for (let i = 0; i < utterancesCount; i++) {
    utterances.push({
        speaker: speakers[fileReader.readByte()],
        text: fileReader.readString(),
        start: fileReader.readFloat32(),
    });
}

await Deno.writeTextFile('converted.json', JSON.stringify(utterances));
