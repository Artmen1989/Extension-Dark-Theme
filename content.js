/**
    * @description      : 
    * @author           : Дом
    * @group            : 
    * @created          : 03/05/2026 - 16:09:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/05/2026
    * - Author          : Дом
    * - Modification    : 
**/
// Функция, которая будет включать/выключать нашу функцию
function applyExtensionState(isEnabled) {
    if (isEnabled) {
        // Здесь пишем код, который должен выполняться, когда переключатель ВКЛЮЧЕН.
        // Например, применение тёмной темы:
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
        console.log("Расширение активно");
    } else {
        // Здесь пишем код, когда переключатель ВЫКЛЮЧЕН.
        // Отменяем изменения, возвращая всё как было:
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        console.log("Расширение неактивно");
    }
}

// Загружаем состояние и применяем функцию при загрузке страницы
chrome.storage.sync.get(['extensionEnabled'], (result) => {
    // По умолчанию считаем, что расширение включено (true)
    const isEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
    applyExtensionState(isEnabled);
});

// Подписываемся на изменения в хранилище, чтобы мгновенно реагировать на
// переключение тумблера, даже если popup уже закрыт
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.extensionEnabled) {
        applyExtensionState(changes.extensionEnabled.newValue);
    }
});