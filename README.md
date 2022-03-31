exposetype
=================

Expose constants, structs, and unions from C to JS.

Created to avoid duplication and minimize boilerplate trying to share constants and data types between C to JS as unfortunately [Embind](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html) is C++ only.

This repository is a mirror of the version embedded in [MHFS](https://github.com/G4Vi/MHFS/blob/dev/public_html/static/music_worklet_inprogress/decoder/src) used for the web player streaming audio decoder.

## Demo
[View](https://g4vi.github.io/exposetype/)

Compiling: `emcc demo.c -s'EXTRA_EXPORTED_RUNTIME_METHODS=["UTF8ToString"]'`

## LICENSE
MIT, see `LICENSE`.