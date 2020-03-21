[![Build Status](https://travis-ci.org/Ironsub/react-cavalier-cli.svg?branch=master)](https://travis-ci.org/Ironsub/react-cavalier-cli)
[![npm](https://img.shields.io/npm/v/ost-cli.svg)](https://www.npmjs.com/package/ost-cli)

# Ost-cli

> A mixture CLI for scaffolding Javascript projects


## Status: beta

Prerequisites: Node.js (>=8.5) and Git.
Most of the planned features are in in development. Creating a simple React.js typical project might be okay.

## Start

### Install by on-line
```bash
npx ost-cli
```

![online](http://g.recordit.co/0Yxc5zcjil.gif)

### Install by package
```bash
npx ost-cli --package
```
![package](http://g.recordit.co/taIWsnHCNV.gif)


## Add Packages

You can add pkg into `packages`:

```
ost-cli
├── packages # Node
│   ├── @pkg-1.zip
│   ├── @pkg-2.zip
│   └── @pkg-3.zip
```

Please ensure pkg-name must includes `@`, and then zip it:

```bash
@web-template ==> @web-template.zip # right 
web-template ==> @web-template.zip # wrong
```

## License

MIT

