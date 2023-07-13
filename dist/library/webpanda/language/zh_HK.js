webpanda.language ({

    10000001: '錯誤命令',
    10000002: '模板內容',
    10000003: '警告命令',
    10000004: '引用信息',

    20000001: '“${1}” 命令不能在同壹個標簽中同時存在或存在多個',
    20000002: '“${1}” 命令不能在同壹個標簽中存在多個',
    20000003: '“${1}” 命令不能爲空',
    20000004: '“${1}” 模板語法錯誤',
    20000005: '“${1}” 命令不合法, 缺少屬性名稱',
    20000006: '“${1}” 命令不合法, 缺少類名稱',
    20000007: '“${1}” 命令不合法, 缺少樣式鍵名稱',
    20000008: '“${1}” 命令缺少事件名稱',
    20000009: '“${1}” 命令語法錯誤, “else if | else” 命令之前的同級節點必須存在 “if”, “else” 命令之前的同級節點必須存在 “else if | if” 命令',

    30000001: '渲染出錯, “${1}” 是渲染數據的屬性, 不能定義爲遍曆單元鍵的別名稱',
    30000002: '渲染出錯, “${1}” 是渲染數據的屬性, 不能定義爲遍曆單元值的別名稱',
    30000003: '渲染出錯, “${1}” 是渲染數據的屬性, 不能定義爲遍曆單元索引的別名稱',
    30000004: '渲染出錯, “${1}” 不是壹個對象',
    30000005: '渲染出錯, “${1}” 不是壹個字符串',
    30000006: '渲染出錯, 選擇器是壹個抽象節點樹, 未找到可渲染有效節點',
    30000007: '渲染出錯, “${1}” 循環標識重複, 自定義的循環標識必須是一個唯一值',
    30000008: '預編譯聲明 “${1}” 未定義',

    40000001: '“${2}” 數據工程初始化異常, “${1}” 數據工程與 “${2}” 數據工程之間存在互相繼承關系, 以致數據工程準備存在繼承不完整缺陷',
    40000002: '“${2}” 數據工程初始化未完成, “${1}” 數據工程與 “${2}” 數據工程之間互相掛載存在缺陷',
    40000003: '“${1}” 數據工程已經存在, 數據工程重複定義被阻止',
    40000004: '“${1}” 數據工程的篩選器 “${2}” 配置不合法, 創建渲染篩選節點失敗',
    40000005: '數據工程 “${1}” 繼承父級數據工程 “${2}” 失敗',
    40000006: '數據工程 “${1}” 挂載數據工程 “${2}” 失敗',
    40000007: 'webpanda.data ({ name: "${1}", ... })',
    40000008: '數據工程 “${1}” 定義的事件 “${2}” 不可使用',
    40000009: '源數據工程 “${1}” 克隆目標數據工程 “${2}” 失敗',
    40000010: '數據工程 “${1}” 不存在',
    40000011: '數據工程 “${1}” 不能自己繼承自己',
    
    50000001: '“${1}” 頁面不存在',
    50000002: '數據工程名稱爲 “${1}” 的頁面不存在',
    50000003: '頁面加載被終止, “${1}” 數據工程創建引入資源失效',
    50000004: '數據工程名稱爲 “${1}” 的頁面, 數據工程文件 “${2}” 加載失敗',
    50000005: '防止暴力刷新, 頁面守護啓動!......更多技術支持: ${1}',
    50000006: 'webpanda.config 全局定義的事件 “${1}” 不可使用',
    50000007: '數據工程 “${1}” 是一個抽象數據，不能用來渲染頁麵',

});
