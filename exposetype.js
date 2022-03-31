const ExposeType_LoadTypes = function(BINDTO, wasmMod, loadType) {
    const currentObject = [BINDTO];
    let mainindex = 0;
    BINDTO[wasmMod.UTF8ToString(loadType(mainindex, 1))] = loadType(mainindex, 2); // load ET_TT_CONST_IV)
    while(1) {
        const typeType = loadType(mainindex, 0);
        if(typeType === 0) break;
        if(typeType === BINDTO.ET_TT_CONST_IV) {
            BINDTO[wasmMod.UTF8ToString(loadType(mainindex, 1))] = loadType(mainindex, 2);
        }
        else if(typeType === BINDTO.ET_TT_CONST_CSTRING) {
            BINDTO[wasmMod.UTF8ToString(loadType(mainindex, 1))] = wasmMod.UTF8ToString(loadType(mainindex, 2));
        }
        else if(typeType === BINDTO.ET_TT_ST) {
            const struct = { name: wasmMod.UTF8ToString(loadType(mainindex, 1)), size: loadType(mainindex, 2), members : {}};
            currentObject.push(struct);
        }
        else if(typeType === BINDTO.ET_TT_ST_END) {
            const structmeta = currentObject.pop();
            const structPrototype = {
                members : structmeta.members,
                get : function(memberName) {
                    const ptr = (this.ptr + this.members[memberName].offset);
                    if(this.members[memberName].type === BINDTO.ET_TT_UINT32) {
                        return wasmMod.HEAPU32[ptr  >> 2];
                    }
                    else if(this.members[memberName].type === BINDTO.ET_TT_UINT64) {
                        return BigInt(wasmMod.HEAPU32[ptr  >> 2]) + (BigInt(wasmMod.HEAPU32[(ptr+4)  >> 2]) << BigInt(32));
                    }
                    else if(this.members[memberName].type === BINDTO.ET_TT_UINT16) {
                        return wasmMod.HEAPU16[ptr  >> 1];
                    }
                    else if(this.members[memberName].type === BINDTO.ET_TT_UINT8) {
                        return wasmMod.HEAPU8[ptr];
                    }
                    throw("ENOTIMPLEMENTED");
                }
            };
            const struct = function(ptr) {
                this.ptr = ptr;
            };
            struct.prototype = structPrototype;
            struct.prototype.constructor = struct;
            BINDTO[structmeta.name] = {
                from : (ptr) => new struct(ptr),
                sizeof : structmeta.size
            };
        }
        else if((typeType === BINDTO.ET_TT_UINT64) || (typeType === BINDTO.ET_TT_UINT32) || (typeType === BINDTO.ET_TT_UINT16) || (typeType === BINDTO.ET_TT_UINT8)) {
            currentObject[currentObject.length-1].members[wasmMod.UTF8ToString(loadType(mainindex, 1))] = {
                type : typeType,
                offset : loadType(mainindex, 2)
            };
        }
        mainindex++;
    }
}
