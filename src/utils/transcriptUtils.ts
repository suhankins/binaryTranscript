interface RawUtterance {
    id: number,
    start: number,
    end: number,
    confidence: number,
    channel: number,
    transcript_value: number,
    speaker: number,
    speakerName: number,
    transcriptId: number
}

export function getSpeakersAndListOfUtternaces(data: any) {
    const speakers: (string | null)[] = [];

    const locationOfListOfLocationsOfUtterances = data[1].utterances as number;
    const listOfLocationsOfUtterances = data[locationOfListOfLocationsOfUtterances] as number[];

    const listOfUtterances = listOfLocationsOfUtterances.map((index) => {
        const rawUtterance = data[index] as RawUtterance;
        const speaker = data[rawUtterance.speakerName] as string | null;
        const text = data[rawUtterance.transcript_value] as string;
        const start = data[rawUtterance.start] as number;

        if (!speakers.includes(speaker)) speakers.push(speaker);
        const speakerIndex = speakers.findIndex(current => current === speaker);

        return {
            speakerIndex,
            text,
            start
        }
    })

    return {
        speakers,
        listOfUtterances
    }
}