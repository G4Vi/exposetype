#include <stdint.h>
#include <stddef.h>
#include <assert.h>
#include "exposetype.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define LIBEXPORT EMSCRIPTEN_KEEPALIVE
#else
#define LIBEXPORT
#endif

typedef struct {
    uint64_t auint64;
    const char *teststring;
} demo_st;

LIBEXPORT const demo_st *demo_get_demo_st_instance(void)
{
    static demo_st demo_st_instance = {
    .auint64 = 0xFFFFFFFFFFFFFFFF,
    .teststring = "hello from c"
    };
    return &demo_st_instance;
}

LIBEXPORT uint64_t demo_et_load_type(const uint32_t itemIndex, const uint32_t subItemIndex)
{
    switch(itemIndex)
    {
        case 0:
        ET_EXPOSE_CONST_IV(ET_TT_CONST_IV);
        break;
        case 1:
        ET_EXPOSE_CONST_IV(ET_TT_CONST_CSTRING);
        break;
        case 2:
        ET_EXPOSE_CONST_IV(ET_TT_ST);
        break;
        case 3:
        ET_EXPOSE_CONST_IV(ET_TT_ST_END);
        break;
        case 4:
        ET_EXPOSE_CONST_IV(ET_TT_UINT64);
        break;
        case 5:
        ET_EXPOSE_CONST_IV(ET_TT_UINT32);
        break;
        case 6:
        ET_EXPOSE_CONST_IV(ET_TT_UINT16);
        break;
        case 7:
        ET_EXPOSE_CONST_IV(ET_TT_UINT8);
        break;
        case 8:
        ET_EXPOSE_STRUCT_BEGIN(demo_st);
        break;
        case 9:
        ET_EXPOSE_STRUCT_UINT64(demo_st, auint64);
        break;
        case 10:
        ET_EXPOSE_STRUCT_PTR(demo_st, teststring);
        break;
        case 11:
        ET_EXPOSE_STRUCT_END();
        break;
    }
    return 0;
}
