# RLBot Stuff

## Development Environment

1. Be on Linux (or Windows Subsystem for Linux)
1. Make sure you have Python 2.7 installed. Use `python --version` to confirm.
1. Make sure you have the latest version of nodejs and npm installed. This will get the job done: https://github.com/nodesource/distributions/blob/master/README.md#debinstall
1. Make sure you have java installed. http://tipsonubuntu.com/2016/07/31/install-oracle-java-8-9-ubuntu-16-04-linux-mint-18/
1. Go download the closure library: https://developers.google.com/blockly/guides/modify/web/closure
   - It tells you to put the folder next to "blockly", but just put it next to this one (scratch-blocks)
   - Be sure to rename the folder to "closure-library". The folder should contain package.json at the top level.
1. Run `npm install`. This should put some files in the dist directory.
Re-run every time you change something.

You'll also want to run `npm run translate` any time you add a string to msg/messages.js.
That will automatically propagate it to several generated files.

The top level package is scratch-gui, go look at its README for a more complete description of
the development cycle.

# scratch-blocks
#### Scratch Blocks is a library for building creative computing interfaces.
[![Build Status](https://travis-ci.org/LLK/scratch-blocks.svg?branch=develop)](https://travis-ci.org/LLK/scratch-blocks)
[![Dependency Status](https://david-dm.org/LLK/scratch-blocks.svg)](https://david-dm.org/LLK/scratch-blocks)
[![devDependency Status](https://david-dm.org/LLK/scratch-blocks/dev-status.svg)](https://david-dm.org/LLK/scratch-blocks#info=devDependencies)

![](https://cloud.githubusercontent.com/assets/747641/15227351/c37c09da-1854-11e6-8dc7-9a298f2b1f01.jpg)

## Introduction
Scratch Blocks is a fork of Google's [Blockly](https://github.com/google/blockly) project that provides a design specification and codebase for building creative computing interfaces. Together with the [Scratch Virtual Machine (VM)](https://github.com/LLK/scratch-vm) this codebase allows for the rapid design and development of visual programming interfaces. Unlike [Blockly](https://github.com/google/blockly), Scratch Blocks does not use [code generators](https://developers.google.com/blockly/guides/configure/web/code-generators), but rather leverages the [Scratch Virtual Machine](https://github.com/LLK/scratch-vm) to create highly dynamic, interactive programming environments.

*This project is in active development and should be considered a "developer preview" at this time.*

## Two Types of Blocks
![](https://cloud.githubusercontent.com/assets/747641/15255731/dad4d028-190b-11e6-9c16-8df7445adc96.png)

Scratch Blocks brings together two different programming "grammars" that the Scratch Team has designed and continued to refine over the past decade. The standard [Scratch](https://scratch.mit.edu) grammar uses blocks that snap together vertically, much like LEGO bricks. For our [ScratchJr](https://scratchjr.org) software, intended for younger children, we developed blocks that are labelled with icons rather than words, and snap together horizontally rather than vertically. We have found that the horizontal grammar is not only friendlier for beginning programmers but also better suited for devices with small screens.

## Documentation
The "getting started" guide including [FAQ](https://scratch.mit.edu/developers#faq) and [design documentation](https://github.com/LLK/scratch-blocks/wiki/Design) can be found in the [wiki](https://github.com/LLK/scratch-blocks/wiki).

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
