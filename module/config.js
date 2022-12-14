export const op_rpg = {};

op_rpg.WeaponDamageTypes = {
    Corte: "Corte",
    Impacto: "Impacto",
    Perfuracao: "Perfuração",
    Balistico: "Balístico"
}

op_rpg.WeaponProficiencyTypes = {
    ArmaSimples: "Simples",
    ArmaTatica: "Tática",
    ArmaPesada: "Pesada"
}

op_rpg.WeaponRangeTypes = {
    ArmaSimples: "Corpo a Corpo",
    ArmaArremesso: "Arremesso",
    ArmaDisparo: "Disparo",
    ArmaFogo: "Fogo"
}

op_rpg.ItemCategory ={
    Cat0: "Categoria: 0",
    Cat1: "Categoria: I",
    Cat2: "Categoria: II",
    Cat3: "Categoria: III",
    Cat4: "Categoria: IV"
}

op_rpg.WeaponHilt = {
    Leve: "Leve",
    UmaMao: "Uma Mão",
    DuasMaos: "Duas Mãos"
}

op_rpg.WeaponThreat = {
    T18: 18,
    T19: 19,
    T20: 20    
}

op_rpg.WeaponCrit = {
    Cx2: "x2",
    Cx3: "x3",
    Cx4: "x4"    
}

op_rpg.WeaponAgileStrong = {
    nothing: "-",
    Cx3: "Agil",
    Cx4: "Forte"    
}

op_rpg.ItemSpace = {
    S0: 0,
    S1: 1,
    S2: 2,
    S3: 3,
    S4: 4    
}

op_rpg.Classes = {
    combatente: "Combatente",
    especialista: "Especialista",
    ocultista: "Ocultista"
}

op_rpg.ClassCaracteristics = {
    combatente: {
        PVInicial: 20,
        PVpNV: 4,
        PEInicial: 2,
        PVpNV: 2,
        SANInicial: 12,
        SANpNV: 3 
    },
    especialista: {
        PVInicial: 16,
        PVpNV: 3,
        PEInicial: 3,
        PVpNV: 3,
        SANInicial: 16,
        SANpNV: 4 
    },
    ocultista: {
        PVInicial: 12,
        PVpNV: 2,
        PEInicial: 4,
        PVpNV: 4,
        SANInicial: 20,
        SANpNV: 5 
    },
}