enum ConditionEnum {
    ACTIVE = 'ACTIVE',
    INNAVBAR = 'INNAVBAR',
}

export const getCondition = (param: string) => {
    switch (param) {
        case ConditionEnum.ACTIVE:
            return { active: true };
        case ConditionEnum.INNAVBAR:
            return { showInNav: true };
        default:
            return undefined;
    }
};
