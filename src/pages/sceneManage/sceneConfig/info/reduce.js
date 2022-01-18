// 
export function isContinueSub(state) {
    if (JSON.stringify(state.getFormData()) === '{}') {
        return false
    }
    if (state.showTab === 1) {
        if (JSON.stringify(state.getFormData()) === JSON.stringify(state.wholeInfo)) {
            return true
        } else {
            return false
        }
    } else {
        if (!state.currentRule) {
            return true
        } else {
            if (state.theme === 'Tab') {
                let info = state.pannelTab.find(item => {
                    return item.tabIndex === state.currentRule
                })
                if (Object.keys(info.info).length && JSON.stringify(info.info) === JSON.stringify(state.getFormData())) {
                    return true
                } else {
                    return false
                }
            } else if (state.theme === 'Node') {
                let dataTab = state.pannelTab.find(item => {
                    return item.tabIndex === state.currentRule
                })
                let dataItem = dataTab.content[state.NodeType - 1].find(item => {
                    return item.propsId === state.propsId
                })
                if (Object.keys(dataItem.contents).length && JSON.stringify(dataItem.contents) === JSON.stringify(state.getFormData())) {
                    return true
                } else {
                    return false
                }
            } else {

            }
        }
    }
    alert(1)
    return false
}