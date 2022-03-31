exposetype
=================

Expose constants, structs, and unions from C to JS.

Created to avoid duplication or writing lots of boilerplate trying to share constants and data types between C to JS as unfortunately [Embind](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html) is C++ only.

The exposetype code is a copy from the streaming audio decoder in the [MHFS monorepo}(https://github.com/G4Vi/MHFS/blob/dev/public_html/static/music_worklet_inprogress/decoder/src/exposetype.h) .

## Demo
Coming soon - inprogress.

Compiling - `emcc demo.c -s'EXTRA_EXPORTED_RUNTIME_METHODS=["UTF8ToString"]'`

## LICENSE
MIT, see `LICENSE`.