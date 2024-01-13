import {
    combineUint8Arrays,
    stringToUint8Array,
    byteToUint8Array,
    float32ToUint8Array,
} from './utils/byteUtils.ts';
import { getSpeakersAndListOfUtternaces } from './utils/transcriptUtils.ts';
import { uint32ToUint8Array } from './utils/byteUtils.ts';

const file = JSON.parse(await Deno.readTextFile(Deno.args[0]));

const { speakers, listOfUtterances } = getSpeakersAndListOfUtternaces(
    file.nodes.find(
        (node: any) =>
            node.data &&
            typeof node.data[0] === 'object' &&
            node.data[0] !== null &&
            'transcript' in node.data[0]
    )?.data
);

const speakersUint8Array = speakers.reduce(
    (acc, cur) => combineUint8Arrays(acc, stringToUint8Array(cur)),
    byteToUint8Array(speakers.length)
);

const utterancesUint8Array = combineUint8Arrays(
    uint32ToUint8Array(listOfUtterances.length),
    ...listOfUtterances.map((cur) =>
        combineUint8Arrays(
            byteToUint8Array(cur.speakerIndex),
            stringToUint8Array(cur.text),
            float32ToUint8Array(cur.start)
        )
    )
);

const finalBuffer = combineUint8Arrays(
    speakersUint8Array,
    utterancesUint8Array
);

await Deno.writeFile('converted.bin', finalBuffer);
