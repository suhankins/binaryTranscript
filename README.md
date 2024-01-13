# Binary Transcript

Quickly put together prototype for converting [Syntax show](https://syntax.fm) JSON transcripts to binary and reading them.

Made after in one of the episodes they mentioned that they wanted to have transcripts
that highlight every word as its spoken, but couldn't do that due to JSON file size being around 50 MB.

I thought this issue could be solved by:
1. Removing all unnecessary info from the JSON file (i.e. confidence scores for every utterance)
2. Converting whole thing to binary

## Usage

Provided in the root repo directory is `test.json`, JSON file that my browser downloaded when I navigated to transcript section of [Episode 716](https://syntax.fm/show/716/js-perf-wins-and-new-node-js-features-with-yagiz-nizipli). [^1]

You can use it as a test file.

### Converting JSON to binary

```sh
deno run ./src/convertToBinary.ts [Path To Json]
```

> [!CAUTION]
> It will override `converted.bin`!

### Converting binary to JSON

```sh
deno run ./src/convertToJson.ts [Path To Binary File]
```

> [!CAUTION]
> It will override `converted.json`!

## Binary file format specification

### File structure

1. Speakers section
2. Utterances section

Both have variable size.

### Speakers section

<table>
    <thead>
        <th>Length in bytes</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Uint8</td>
            <td>Number of speakers</td>
        </tr>
        <tr>
            <td colspan="3">The following is repeated for the given number of speakers</td>
        </tr>
        <tr>
            <td>Variable</td>
            <td>Null-terminated string</td>
            <td>Speaker's name</td>
        </tr>
    </tbody>
</table>

### Utterances section

<table>
    <thead>
        <th>Length in bytes</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>4</td>
            <td>Uint32</td>
            <td>Number of utterances</td>
        </tr>
        <tr>
            <td colspan="3">The following is repeated for the given number of utterances</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Uint8</td>
            <td>Speaker's index</td>
        </tr>
        <tr>
            <td>Variable</td>
            <td>Null-terminated string</td>
            <td>Transcript</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Float32</td>
            <td>Start timecode</td>
        </tr>
    </tbody>
</table>

## Was it worth it?

Not really.

### Uncompressed

When uncompressed we can clearly that just removing all unused information reduced file size by more than 2 times,
though it does look like converting it to binary made it almost 4 times smaller.

| File | Size |
| --- | --- |
| Original | 237 KB |
| Binary | 56 KB |
| Binary to JSON | 99 KB |

But when we compress them...

### Compressed

...we can see that all we saved with this whole binary conversion is just 3 KB.

| File | Size |
| --- | --- |
| Original | 72 KB |
| Binary | 23 KB |
| Binary to JSON | 27 KB |

I guess that isn't too bad, but it is disappointing.

## License

The Unlicense, except for `test.json`.

[^1]: I have no idea why does it include show notes. They aren't even used when you navigate from transcript to show notes: when you do that, it just downloads a new JSON file with show notes.
